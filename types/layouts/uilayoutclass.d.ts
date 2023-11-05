import { UILayout, UISchemaLayoutSettings, UISchemaUIElement, UISchemaUIElementLayoutSettings } from "../uischema";
import { UILayoutRenderContext } from "../uielementrendercontext";
import { TemplateResult } from "lit";
export declare abstract class UILayoutClass {
    layoutSettings?: UISchemaLayoutSettings;
    _id: string;
    abstract cssClass: string;
    renderElementLabels: boolean;
    /**
     * onRequestUpdate needs a method assigned that is statically bound to the method's instance.
     * So something like
     * `layout.onRequestUpdate = this.updateRequested.bind(this)`
     */
    onRequestUpdate: undefined | (() => void);
    constructor(id: string, layoutSettings?: UISchemaLayoutSettings);
    abstract renderLayoutStyles(layout?: UISchemaUIElementLayoutSettings): string;
    protected requestUpdate(): void;
    get defaultElementVisibility(): string | boolean;
    renderLayout(renderContext: UILayoutRenderContext, layouter: UILayoutClass, style: string, renderElement: (id: string, entry: UISchemaUIElement, layouter: UILayoutClass) => TemplateResult): TemplateResult;
    renderElement(layout: UISchemaUIElementLayoutSettings | undefined, element: TemplateResult): TemplateResult;
    getOrderedElements(layoutSchema: UILayout): Array<string>;
}
export declare abstract class UIListLayoutClass extends UILayoutClass {
    _sortOrder: Array<string>;
    protected _initSorting(renderContext: UILayoutRenderContext): void;
}
