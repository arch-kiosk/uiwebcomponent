import { UIElement } from "./uielement";
import { UIElementRenderContext } from "../uielementrendercontext";
export declare class UIElementLine extends UIElement {
    static isVisible(context: UIElementRenderContext, value: any): boolean;
    static render(context: UIElementRenderContext, id: string): import("lit-html").TemplateResult;
}
