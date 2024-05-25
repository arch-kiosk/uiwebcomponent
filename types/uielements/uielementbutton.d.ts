import { UIElement } from "./uielement";
import { UISchemaUIElementType } from "../uischema";
import { UIElementRenderContext } from "../uielementrendercontext";
export declare class UIElementButton extends UIElement {
    static defaultAction(element: UISchemaUIElementType): string | undefined;
    static render(context: UIElementRenderContext, id: string): import("lit-html").TemplateResult<1 | 2>;
}
