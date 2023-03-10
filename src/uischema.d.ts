// export type AnyDict = {
//     [key: string]: any
// }

import {ComboBoxDataProviderParams} from "@vaadin/combo-box";
import {ComboBoxDataProviderCallback} from "@vaadin/combo-box/src/vaadin-combo-box-data-provider-mixin";

interface Dictionary<T> {
    [Key: string]: T;
}

export declare interface UILayout {
    layout_settings?: UISchemaLayoutSettings
    ui_elements: Dictionary<UISchemaUIElement>
}
export declare interface UISchema extends UILayout{
    header: UISchemaHeaderDict
    meta?: UISchemaMetaSettings
    dsd?: UISchemaDSDDict
}

export declare interface UISchemaHeaderDict {
    version: number
}

export declare interface UISchemaMetaSettings {
    scenario?: string
}

export declare interface UISchemaDSDDict {
    [key:string]: string[]
}

export declare interface UISchemaLayoutSettings{
    orchestration_strategy?: string
    order?: string[]
}

export declare interface UISchemaUIElement {
    binding?: UISchemaUIElementBinding
    layout?: UISchemaUIElementLayoutSettings
    element_type: UISchemaUIElementType
}

export declare interface UISchemaUIElementWithId {
    id: string
    element: UISchemaUIElement
}

export declare interface UISchemaUIElementBinding {
    field_name: string
}

export declare interface UISchemaUIElementLayoutSettings {
    min_width?: number | "max"
    padding?: number | string | UISchemaLayoutPadding
}

export declare interface UISchemaLayoutPadding {
    top: number,
    right: number,
    bottom: number,
    left: number
}

export declare interface UISchemaUIElementType {
    name: string
    text?: string
    value?: string
    padding?: number | string | UISchemaLayoutPadding
}

export declare interface UISchemaLayoutElement extends UISchemaUIElementType, UILayout {
    name: "layout"
    layout?: UISchemaUIElementLayoutSettings
}

export declare interface UISchemaButton extends UISchemaUIElementType {
    name: "button"
    type?: "okButton" | "cancelButton" | "iconButton"
}

export declare interface UISchemaComboBox extends UISchemaUIElementType {
    name: "combobox"
    items: Array<string> | UISchemaApiList
}

export declare interface UISchemaTemplateLabel extends UISchemaUIElementType {
    name: "templatelabel"
    style?: string
}

export declare interface UISchemaApiList {
    topic: string
}

export type UISchemaLookupProvider = (elementId: string, params: ComboBoxDataProviderParams<any>, callback: ComboBoxDataProviderCallback<TItem>) => void;

export type UIInputData = Dictionary<T>

// export declare interface UISchemaUIElements {
//     [key: string]: UISchemaUIElement
// }
