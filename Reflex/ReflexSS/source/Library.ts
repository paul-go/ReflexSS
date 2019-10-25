
namespace Reflex.SS
{
	export type Node = HTMLElement | Text;
	export type Branch = Rule | Command;
	export type Atomic = Core.Atomic<Node, Branch, string>;
	export type Atomics = Core.Atomics<Node, Branch, string>;
	
	/**
	 * Top-level value for all possible inputs
	 * to the CSS property creation functions.
	 */
	export type CssValue = string | number | Command | Unit;
	
	/**
	 * Creates a namespace.
	 */
	export interface Namespace extends Core.IContainerNamespace<Atomics, string>
	{
		/**
		 * Serializes all generated CSS content into a string.
		 */
		emit(options?: IEmitOptions): string;
		
		/**
		 * Toggles whether generated CSS is streamed directly into
		 * a CSS style sheet, embedded directly in the web page. 
		 * 
		 * Has no effect in the case when this library is not operating
		 * in the context of a web browser.
		 * 
		 * @param enable Whether to enable streaming.
		 * If unspecified, the value is assumed to be `true`.
		 */
		stream(enable?: boolean): void;
	}
	
	/**
	 * 
	 */
	export class Library implements Reflex.Core.ILibrary
	{
		/** */
		constructor()
		{
			this.stream(true);
		}
		
		/** */
		isKnownBranch(branch: Branch)
		{
			return branch instanceof Rule || branch instanceof Command;
		}
		
		/** */
		isKnownLeaf(leaf: object)
		{
			return leaf instanceof Command;
		}
		
		/** */
		isBranchDisposed()
		{
			return false;
		}
		
		/** */
		getStaticNonBranches()
		{
			return {
				emit: (options?: IEmitOptions) => this.emit(options || {}),
				stream: (enable?: boolean) => this.stream(!!enable)
			}
		}
		
		/** */
		private emit(options: IEmitOptions)
		{
			const opt = fillOptions(options);
			
			const rules = Array.from(this.fauxSheet.values())
				.filter(rule => rule.containers.length === 0)
				.map(rule => rule.toStringArray(opt))
				.reduce((a, b) => a.concat(b), []);
			
			return rules.join(opt.line + opt.line);
		}
		
		/**
		 * Enables or disables streaming of CSS content to a generated style sheet.
		 */
		private stream(enable: boolean)
		{
			if (typeof window === "undefined" ||
				typeof document === "undefined")
				return;
			
			if (!(this.streamingEnabled = enable))
				return;
			
			if (!this.nativeSheet)
			{
				const link = document.createElement("style");
				document.head.appendChild(link);
				this.nativeSheet = <CSSStyleSheet>link.sheet;
			}
		}
		
		/**
		 * @internal
		 * An internal map that stores all of the generated CSS rules,
		 * as well as the internally generated identifiers (which may 
		 * become class names) that refer to them.
		 */
		private readonly fauxSheet = new Map<string, Rule>();
		
		/**
		 * @internal
		 * Stores a table of hashes of all serialized rules.
		 * Used to determine if an identical rule has already been
		 * generated. Note that this only deals with rules that are
		 * generated on the client side. Rules that were brought
		 * into the system by another means are not considered.
		 */
		private readonly ruleHashes = new Set<string>();
		
		/**
		 * @internal
		 * Stores a value that indicates whether a native CSSStyleSheet
		 * object has been created, which will be used as the storage
		 * location for CSS information generated at runtime. The member
		 * is unused outside of the browser.
		 */
		private nativeSheet?: CSSStyleSheet;
		
		/**
		 * @internal
		 * Stores whether the streaming to a CSSStyleSheet is enabled.
		 * The member is unused outside of the browser.
		 */
		private streamingEnabled?: boolean;
		
		/** */
		getDynamicNonBranch(name: string)
		{
			return (...values: any[]) =>
			{
				return new Command(name, values);
			}
		}
		
		/** */
		getChildren(target: Branch)
		{
			if (target instanceof Rule)
				return (<Branch[]>target.declarations).concat(target.children);
			
			return target.values;
		}
		
		/** */
		createContainer()
		{
			return new Rule();
		}
		
		/** */
		attachAtomic(
			atomic: any,
			owner: Branch,
			ref: Node | "prepend" | "append")
		{
			if (owner instanceof Rule)
			{
				if (typeof atomic === "number")
				{
					const nth = Math.floor(atomic);
					owner.selectorFragments.push(nth < 0 ?
						`:nth-last-child(${nth * -1})` :
						`:nth-child(${nth - 1})`);
				}
				else if (typeof atomic === "string")
				{
					const existingRule = this.fauxSheet.get(atomic);
					if (existingRule)
					{
						existingRule.containers.push(owner);
						owner.children.push(existingRule);
					}
					else owner.selectorFragments.push(atomic);
				}
				else if (atomic instanceof Command)
				{
					owner.declarations.push(atomic);
				}
				else if (atomic instanceof Rule)
				{
					// Nested rule
					// This wouldn't actually happen, because 
					// the ss() function returns a string, not a rule.
					debugger;
				}
			}
		}
		
		/** */
		detachAtomic()
		{
			throw new Error("Not implemented.");
		}
		
		/** */
		swapBranches()
		{
			throw new Error("Not supported.");
		}
		
		/** */
		replaceBranch()
		{
			throw new Error("Not supported.");
		}
		
		/** */
		attachAttribute()
		{
			throw new Error("Not supported.");
		}
		
		/** */
		detachAttribute()
		{
			throw new Error("Not supported.");
		}
		
		/** */
		handleBranchFunction(
			branch: Reflex.Core.IBranch, 
			branchFn: (...atomics: any[]) => Reflex.Core.IBranch)
		{
			this.attachAtomic(
				" " + branchFn.name.toUpperCase(),
				<Branch>branch,
				"append");
		}
		
		/** */
		returnBranch(branch: Reflex.Core.IBranch)
		{
			if (!(branch instanceof Rule))
				return branch;
			
			const cls = branch.class;
			if (!this.fauxSheet.has(cls))
				this.fauxSheet.set(cls, branch);
			
			if (this.streamingEnabled && this.nativeSheet)
			{
				for (const cssText of branch.toStringArray())
				{
					const ruleHash = Util.calculateHash(cssText).toString(36);
					if (!this.ruleHashes.has(ruleHash))
					{
						const len = this.nativeSheet.cssRules.length;
						this.nativeSheet.insertRule(cssText, len);
						this.ruleHashes.add(ruleHash);
					}
				}
			}
			return cls;
		}
	}
}
