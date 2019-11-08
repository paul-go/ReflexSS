
declare namespace Reflex.SS
{
	export interface Namespace
	{
		/**
		 * The **`left`** CSS property participates in specifying the horizontal position of a _positioned element_. It has no effect on non-positioned elements.
		 * 
		 * **Initial value**: `auto`
		 * 
		 * | Chrome | Firefox | Safari |  Edge  |   IE    |
		 * | :----: | :-----: | :----: | :----: | :-----: |
		 * | **1**  |  **1**  | **1**  | **12** | **5.5** |
		 * 
		 * @see https://developer.mozilla.org/docs/Web/CSS/left
		 */
		left(...values: CssValue[]): Command;
		/**
		 * The **`left`** CSS property participates in specifying the horizontal position of a _positioned element_. It has no effect on non-positioned elements.
		 * 
		 * **Initial value**: `auto`
		 * 
		 * | Chrome | Firefox | Safari |  Edge  |   IE    |
		 * | :----: | :-----: | :----: | :----: | :-----: |
		 * | **1**  |  **1**  | **1**  | **12** | **5.5** |
		 * 
		 * @see https://developer.mozilla.org/docs/Web/CSS/left
		 */
		left(...values: CssValue[][]): Command;
	}
}
