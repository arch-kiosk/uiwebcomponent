import { LitElement, TemplateResult, PropertyValues } from "lit";
import '@vaadin/date-picker';
import '@vaadin/date-time-picker';
import '@vaadin/combo-box';
import './fileview';
import { UIElementFactory } from "./uielementfactory";
import { UISchema, UIInputData, UISchemaUIElement, UISchemaLayoutElement, UISchemaLayoutSettings, UISchemaLayoutPadding, UISchemaComboBox, UISchemaLookupProvider, UISchemaUIElementWithId, UIComponentDataProvider, UIComponentMoveToNextRowProvider, UIComponentSetSortOrderProvider, UIComponentFetchFileProvider } from "./uischema";
import { UILayoutClass } from "./layoutclasses";
export declare class UIComponent extends LitElement {
    static styles: import("lit").CSSResult;
    _messages: {
        [key: string]: object;
    };
    _dsd_to_element_list: {
        [key: string]: UISchemaUIElementWithId;
    };
    _element_list: {
        [key: string]: UISchemaUIElement;
    };
    _selection_data: {
        [key: string]: {
            [key: string]: string;
        };
    };
    uiElementFactory: UIElementFactory | null;
    uiSchema: UISchema | null;
    linkIdentifiers: boolean;
    showDevelopmentInfo: boolean;
    data: UIInputData;
    lookupProvider: UISchemaLookupProvider | null;
    dataProvider: UIComponentDataProvider | null;
    moveToNextRow: UIComponentMoveToNextRowProvider | null;
    setSortOrder: UIComponentSetSortOrderProvider | null;
    fetchFileProvider: UIComponentFetchFileProvider | null;
    _showError: string | null;
    private _default;
    constructor();
    protected willUpdate(_changedProperties: PropertyValues): void;
    keyupOnElement(e: KeyboardEvent): void;
    firstUpdated(_changedProperties: any): void;
    updated(_changedProperties: any): void;
    getSchemaElement(id: string): UISchemaUIElement;
    gotoRecord(uid: string): boolean;
    processSchemaDefinition(): void;
    private registerDefault;
    gatherData(): {
        [key: string]: any;
    };
    fetchFile(event: CustomEvent): void;
    get_field_value(id: string, element: UISchemaUIElement): any;
    getSelectionValue(id: string, domElement: HTMLFormElement | null, comboBox: UISchemaComboBox): any;
    fieldChangedById(id: string): void;
    fieldChanged(e: Event): void;
    getLayoutClass(layoutElementId: string, layoutSettings?: UISchemaLayoutSettings, inheritReadOnly?: boolean): UILayoutClass;
    renderUIElement(id: string, entry: UISchemaUIElement, layouter: UILayoutClass): TemplateResult<1 | 2>;
    renderElement(id: string, entry: UISchemaUIElement, layouter: UILayoutClass): TemplateResult<1 | 2>;
    getPaddingStyle(padding?: string | number | UISchemaLayoutPadding): string;
    private onRequestUpdate;
    renderLayoutElement(id: string, entry: UISchemaLayoutElement, layouter: UILayoutClass): TemplateResult;
    hideDevelopmentInfo(): void;
    gotoIdentifier(event: PointerEvent): void;
    render(): TemplateResult<1 | 2>;
}
