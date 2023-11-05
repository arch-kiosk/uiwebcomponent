import { UISchemaUIElement, UISchemaUIElementLayoutSettings } from "../uischema";
import { nothing, TemplateResult } from "lit";
import { UILayoutRenderContext } from "../uielementrendercontext";
import { UILayoutClass, UIListLayoutClass } from "./uilayoutclass";
export declare class UITableLayoutClass extends UIListLayoutClass {
    cssClass: string;
    renderElementLabels: boolean;
    renderLayoutStyles(layout?: UISchemaUIElementLayoutSettings): string;
    headerClicked(event: MouseEvent): void;
    renderSortButton(id: string): TemplateResult<1> | typeof nothing;
    renderHeaders(renderContext: UILayoutRenderContext, elements: string[]): TemplateResult<1>;
    private getTableHeaderStyle;
    renderLayout(renderContext: UILayoutRenderContext, layouter: UILayoutClass, style: string, renderElement: (id: string, entry: UISchemaUIElement, layouter: UILayoutClass) => TemplateResult): TemplateResult;
    renderElement(layout: UISchemaUIElementLayoutSettings | undefined, element: TemplateResult): TemplateResult;
}
