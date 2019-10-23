
declare namespace Reflex.SS
{
	export interface Namespace
	{
		/**
		 * The **`text-decoration`** CSS property sets the appearance of decorative lines on text. It is a shorthand for `text-decoration-line`, `text-decoration-color`, and `text-decoration-style`.
		 * 
		 * | Chrome | Firefox | Safari |  Edge  |  IE   |
		 * | :----: | :-----: | :----: | :----: | :---: |
		 * | **1**  |  **1**  | **1**  | **12** | **3** |
		 * 
		 * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration
		 */
		textDecoration(value: CssValue, ...values: CssValue[]): Call;
		/**
		 * The **`text-decoration`** CSS property sets the appearance of decorative lines on text. It is a shorthand for `text-decoration-line`, `text-decoration-color`, and `text-decoration-style`.
		 * 
		 * | Chrome | Firefox | Safari |  Edge  |  IE   |
		 * | :----: | :-----: | :----: | :----: | :---: |
		 * | **1**  |  **1**  | **1**  | **12** | **3** |
		 * 
		 * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration
		 */
		textDecoration(values: CssValue[][]): Call;
		/**
		 * The **`text-decoration`** CSS property sets the appearance of decorative lines on text. It is a shorthand for `text-decoration-line`, `text-decoration-color`, and `text-decoration-style`.
		 * 
		 * | Chrome | Firefox | Safari |  Edge  |  IE   |
		 * | :----: | :-----: | :----: | :----: | :---: |
		 * | **1**  |  **1**  | **1**  | **12** | **3** |
		 * 
		 * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration
		 */
		"text-decoration"(value: CssValue, ...values: CssValue[]): Call;
		/**
		 * The **`text-decoration`** CSS property sets the appearance of decorative lines on text. It is a shorthand for `text-decoration-line`, `text-decoration-color`, and `text-decoration-style`.
		 * 
		 * | Chrome | Firefox | Safari |  Edge  |  IE   |
		 * | :----: | :-----: | :----: | :----: | :---: |
		 * | **1**  |  **1**  | **1**  | **12** | **3** |
		 * 
		 * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration
		 */
		"text-decoration"(values: CssValue[][]): Call;
	}
}