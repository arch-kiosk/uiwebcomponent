import { UIComponent } from "./ui-component";
import { UIInputData, UILayout, UISchemaUIElement } from "./uischema";
import { UILayoutClass } from "./layoutclasses";
export declare class RenderContext {
    uicomponent: UIComponent;
    layouter: UILayoutClass;
    data: UIInputData;
    _lastUID: string;
    constructor(component: UIComponent, layouter: UILayoutClass, data: UIInputData);
    haulData(value?: string, id?: string): any;
    resetCursor(): void;
    next(): boolean;
}
export declare class UIElementRenderContext extends RenderContext {
    entry: UISchemaUIElement;
    constructor(component: UIComponent, entry: UISchemaUIElement, layouter: UILayoutClass, data: UIInputData);
}
export declare class UILayoutRenderContext extends RenderContext {
    entry: UILayout;
    _sortOrder: Array<string>;
    constructor(component: UIComponent, entry: UILayout, layouter: UILayoutClass, data: UIInputData);
    resetCursor(): void;
}
