import { UISchemaUIElement, UISchemaUIElementLayoutSettings } from "../uischema";
import { TemplateResult } from "lit";
import { UILayoutRenderContext } from "../uielementrendercontext";
import { UILayoutClass, UIListLayoutClass } from "./uilayoutclass";
export declare class UIGalleryLayoutClass extends UIListLayoutClass {
    cssClass: string;
    renderElementLabels: boolean;
    _sortOrder: Array<string>;
    renderLayoutStyles(layout?: UISchemaUIElementLayoutSettings): string;
    renderLayout(renderContext: UILayoutRenderContext, layouter: UILayoutClass, style: string, renderElement: (id: string, entry: UISchemaUIElement, layouter: UILayoutClass) => TemplateResult): TemplateResult;
    renderElement(layout: UISchemaUIElementLayoutSettings | undefined, element: TemplateResult): TemplateResult;
}
