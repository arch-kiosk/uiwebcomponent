import { UIElement } from "./uielement";
import { UIElementRenderContext } from "../uielementrendercontext";
export declare class UIElementComboBox extends UIElement {
    static renderLabel(context: UIElementRenderContext, id: string, text: string): import("lit-html").TemplateResult<1> | import("lit-html").TemplateResult[];
    static renderReadOnly(context: UIElementRenderContext, id: string, text: string): import("lit-html").TemplateResult;
    static renderWithStaticSelection(context: UIElementRenderContext, id: string, text: string): import("lit-html").TemplateResult;
    static renderWithDynamicSelection(context: UIElementRenderContext, id: string, text: string): import("lit-html").TemplateResult;
    static render(context: UIElementRenderContext, id: string): import("lit-html").TemplateResult;
}
