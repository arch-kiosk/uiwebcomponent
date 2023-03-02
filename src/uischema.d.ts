export type AnyDict = {
    [key: string]: any
}

interface Dictionary<T> {
    [Key: string]: T;
}
export declare interface UISchemaHeaderDict {
    version: number
}
export declare interface UISchemaDSDDict {
    [key:string]: string[]
}

export declare interface UISchemaLayoutSettings{
    scenario?: string
    orchestration_strategy?: string
    order?: string[]
}

export declare interface UISchemaUIElementBinding {
    field_name: string
}

export declare interface UISchemaUIElementLayout {
    min_width?: number
    max_width?: number
}

export declare interface UISchemaUIElementType {
    name: string
    text?: string
}

export declare interface UISchemaUIElement {
    binding?: UISchemaUIElementBinding
    layout?: UISchemaUIElementLayout
    element_type: UISchemaUIElementType
}

// export declare interface UISchemaUIElements {
//     [key: string]: UISchemaUIElement
// }

export declare interface UISchema {
    header: UISchemaHeaderDict
    dsd?: UISchemaDSDDict
    layout_settings?: UISchemaLayoutSettings
    ui_elements: Dictionary<UISchemaUIElement>
}