import { UIElement } from "./uielement";
import { UIElementRenderContext } from "../uielementrendercontext";
import { nothing } from "lit";
export declare class UIElementTemplateLabel extends UIElement {
    static renderLabel(context: UIElementRenderContext, id: string, text: string): import("lit-html").TemplateResult<1> | typeof nothing;
    static render(context: UIElementRenderContext, id: string): import("lit-html").TemplateResult<1 | 2>;
}
