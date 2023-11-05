import { UISchemaUIElementLayoutSettings } from "../uischema";
import { UILayoutClass } from "./uilayoutclass";
export declare class UIColumnLayoutClass extends UILayoutClass {
    cssClass: string;
    renderLayoutStyles(layout?: UISchemaUIElementLayoutSettings): string;
}
