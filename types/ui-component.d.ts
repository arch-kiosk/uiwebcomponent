import { LitElement, TemplateResult, PropertyValues } from "lit";
import '@vaadin/date-picker';
import '@vaadin/date-time-picker';
import '@vaadin/combo-box';
import { UISchema, UIInputData, UISchemaUIElement, UISchemaLayoutElement, UILayout, UISchemaLayoutSettings, UISchemaLayoutPadding, UISchemaLookupProvider, UISchemaUIElementWithId } from "./uischema";
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
    uiSchema: UISchema | null;
    data: UIInputData;
    lookupProvider: UISchemaLookupProvider | null;
    _showError: string | null;
    constructor();
    protected willUpdate(_changedProperties: PropertyValues): void;
    firstUpdated(_changedProperties: any): void;
    updated(_changedProperties: any): void;
    getSchemaElement(id: string): UISchemaUIElement;
    processSchemaDefinition(): void;
    gatherData(): {
        [key: string]: any;
    };
    get_field_value(id: string, element: UISchemaUIElement): any;
    getSelectionValue(id: string, domElement: HTMLFormElement | null): string;
    fieldChanged(e: Event): void;
    getLayoutClass(layoutSettings?: UISchemaLayoutSettings): UILayoutClass | null;
    renderTextField(id: string, entry: UISchemaUIElement, layouter: UILayoutClass): TemplateResult<1 | 2>;
    renderDateField(id: string, entry: UISchemaUIElement, layouter: UILayoutClass): TemplateResult<1 | 2>;
    renderDateTimeField(id: string, entry: UISchemaUIElement, layouter: UILayoutClass): TemplateResult<1 | 2>;
    renderButton(id: string, entry: UISchemaUIElement): TemplateResult<1 | 2>;
    renderComboBox(id: string, entry: UISchemaUIElement, layouter: UILayoutClass): TemplateResult<1 | 2>;
    renderLine(id: string, entry: UISchemaUIElement): TemplateResult<1 | 2>;
    renderTemplateLabel(id: string, entry: UISchemaUIElement, layouter: UILayoutClass): TemplateResult<1 | 2>;
    renderElement(id: string, entry: UISchemaUIElement, layouter: UILayoutClass): TemplateResult<1 | 2>;
    getPaddingStyle(padding?: string | number | UISchemaLayoutPadding): string;
    renderLayoutElement(id: string, entry: UISchemaLayoutElement, layouter: UILayoutClass): TemplateResult;
    renderLayout(layoutSchema: UILayout, layouter: UILayoutClass, style?: string): TemplateResult<1 | 2>;
    render(): TemplateResult<1 | 2>;
}
