import { UIElement } from "./uielement";
import { UIElementRenderContext } from "../uielementrendercontext";
export declare class UIElementDateTimeField extends UIElement {
    static renderLabel(context: UIElementRenderContext, id: string, text: string): import("lit-html").TemplateResult<1> | import("lit-html").TemplateResult[];
    static openDateTimePopover(e: MouseEvent): void;
    static render(context: UIElementRenderContext, id: string): import("lit-html").TemplateResult;
}
