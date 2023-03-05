import { LitElement } from "lit";
import { UISchema, UISchemaUIElement } from "./uischema";
export declare class UIComponent extends LitElement {
    static styles: import("lit").CSSResult;
    _messages: {
        [key: string]: object;
    };
    ui_schema: UISchema | null;
    constructor();
    firstUpdated(_changedProperties: any): void;
    updated(_changedProperties: any): void;
    getLayoutClass(): "UIColumnLayout" | "";
    renderTextField(id: string, entry: UISchemaUIElement): import("lit-html").TemplateResult<1 | 2>;
    renderElement(id: string, entry: UISchemaUIElement): import("lit-html").TemplateResult<1 | 2>;
    render(): import("lit-html").TemplateResult<1 | 2>;
}
