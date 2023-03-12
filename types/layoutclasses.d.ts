import { UISchemaLayoutSettings, UISchemaUIElementLayoutSettings } from "./uischema";
export declare abstract class UILayoutClass {
    layoutSettings?: UISchemaLayoutSettings;
    abstract cssClass: string;
    constructor(layoutSettings?: UISchemaLayoutSettings);
    abstract renderLayoutStyles(layout?: UISchemaUIElementLayoutSettings): string;
}
export declare class UIColumnLayoutClass extends UILayoutClass {
    cssClass: string;
    renderLayoutStyles(layout?: UISchemaUIElementLayoutSettings): string;
}
export declare class UIStackLayoutClass extends UILayoutClass {
    cssClass: string;
    renderLayoutStyles(layout?: UISchemaUIElementLayoutSettings): string;
}
export declare class UIRightAlignLayoutClass extends UILayoutClass {
    cssClass: string;
    renderLayoutStyles(): string;
}
