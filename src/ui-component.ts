import { unsafeCSS, LitElement } from "lit";
import { html, literal } from 'lit/static-html.js'
import { customElement, property, state } from "lit/decorators.js";

// import local_css from "/src/static/logviewerapp.sass?inline";
// @ts-ignore
import local_css from "./styles/ui-component.sass?inline";
import {UISchema, UISchemaUIElement} from "./uischema";

@customElement("ui-component")
export class UIComponent extends LitElement {
    static styles = unsafeCSS(local_css);
    _messages: { [key: string]: object } = {};


    @property()
    ui_schema: UISchema | null = null

    // @state()
    // inSelectQueryMode = true;

    constructor() {
        super();
    }

    firstUpdated(_changedProperties: any) {
        console.log("App first updated.");
        super.firstUpdated(_changedProperties);
    }

    updated(_changedProperties: any) {
        super.updated(_changedProperties);
        // if (_changedProperties.has("apiContext")) {
        //     if (this.apiContext) console.log("starting app");
        // }
    }

    getLayoutClass() {
        if (this.ui_schema?.layout_settings?.orchestration_strategy) {
            switch (this.ui_schema.layout_settings.orchestration_strategy) {
                case "columns": return "UIColumnLayout"
                default: return ""
            }
        } else
            return "UIColumnLayout"
    }

    renderTextField(id: string, entry: UISchemaUIElement) {
        return html`
            <div class="text-field-div">
                <label for="${id}">${entry.element_type.text!}</label> 
                <input id=${id} name=${id} type="text"/>
            </div>
        `
    }

    renderElement(id: string, entry: UISchemaUIElement) {
        switch (entry.element_type.name) {
            case "TextField":
                return this.renderTextField(id, entry)
            default:
                return html`
                    ${id}: Unknown field type ${entry.element_type.name}
                `
        }
    }

    render() {
        const layoutClass = this.getLayoutClass()
        if (!layoutClass) return html`Unknown Orchestration Strategy.`
        return html`
            <div class=${layoutClass}>
                ${Object.entries(this.ui_schema!.ui_elements).map(([id, entry]) => this.renderElement(id, entry))}
            </div>
        `
    }
}
