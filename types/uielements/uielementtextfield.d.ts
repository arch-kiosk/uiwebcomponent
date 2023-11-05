import { UIElement } from "./uielement";
import { UIElementRenderContext } from "../uielementrendercontext";
export declare class UIElementTextField extends UIElement {
    static renderLabel(context: UIElementRenderContext, id: string, text: string): import("lit-html").TemplateResult<1> | import("lit-html").TemplateResult<1 | 2>[];
    static render(context: UIElementRenderContext, id: string): import("lit-html").TemplateResult<1 | 2>;
}
