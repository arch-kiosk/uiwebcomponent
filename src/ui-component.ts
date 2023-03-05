import {unsafeCSS, LitElement, TemplateResult} from "lit";
import { html } from 'lit/static-html.js'
import { customElement, property } from "lit/decorators.js";

// import local_css from "/src/static/logviewerapp.sass?inline";
// @ts-ignore
import local_css from "./styles/ui-component.sass?inline";
import {
    UISchema,
    UISchemaUIElement,
    UISchemaLayoutElement,
    UILayout,
    UISchemaLayoutSettings,
    UISchemaLayoutPadding
} from "./uischema";
import {UIStackLayoutClass,UIColumnLayoutClass,UILayoutClass,UIRightAlignLayoutClass} from "./layoutclasses"

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

    getLayoutClass(layoutSettings?: UISchemaLayoutSettings): UILayoutClass | null {
        if (layoutSettings?.orchestration_strategy) {
            switch (layoutSettings?.orchestration_strategy.toLowerCase()) {
                case "columns": return new UIColumnLayoutClass(layoutSettings)
                case "rightalign": return new UIRightAlignLayoutClass(layoutSettings)
                case "stack": return new UIStackLayoutClass(layoutSettings)
                default: return null
            }
        } else
            return new UIColumnLayoutClass(layoutSettings)
    }

    renderTextField(id: string, entry: UISchemaUIElement, layouter: UILayoutClass) {
        return html`
            <div class="text-field-div" style="${layouter.renderLayoutStyles(entry.layout)}">
                <label for="${id}">${entry.element_type.text!}</label> 
                <input id=${id} name=${id} type="text"/>
            </div>
        `
    }

    renderButton(id: string, entry: UISchemaUIElement) {
        const button = <UISchemaButton>entry.element_type
        let buttonClass = "modal-button"

        switch (button.type) {
            case "cancelButton": buttonClass = "modal-cancel"
                                 break
            case "okButton": buttonClass = "modal-ok"
                                break
            default: break
        }
        return html`
            <button class="${buttonClass}" id=${id} name=${id}">
                ${entry.element_type.text!} 
            </button>
        `
    }

    renderLine(id: string, entry: UISchemaUIElement) {
        return html`
            <div class="ui-line" id="${id}" style="${this.getPaddingStyle(entry.element_type.padding).replace("padding", "margin")}">
            </div>
        `
    }

    renderElement(id: string, entry: UISchemaUIElement, layouter: UILayoutClass) {
        switch (entry.element_type.name.toLowerCase()) {
            case "textfield":
                return this.renderTextField(id, entry, layouter)
            case "layout":
                return this.renderLayoutElement(id, <UISchemaLayoutElement>entry.element_type, layouter)
            case "button":
                return this.renderButton(id, entry)
            case "line":
                return this.renderLine(id, entry)
            default:
                return html`
                    ${id}: Unknown field type ${entry.element_type.name}
                `
        }
    }

    getPaddingStyle(padding?: string | number | UISchemaLayoutPadding) {
        let style = ""
        if (typeof padding === "number") {
            style = `padding: ${padding}px`
        } else if (typeof padding === "string") {
            style = `padding: ${padding}`
        } else if (padding) {
            console.log(typeof padding)
            style = `padding: ${(<UISchemaLayoutPadding>padding).top} ${(<UISchemaLayoutPadding>padding).right} ${(<UISchemaLayoutPadding>padding).bottom} ${(<UISchemaLayoutPadding>padding).left}`
        }
        return style
    }

    renderLayoutElement(id: string, entry: UISchemaLayoutElement, layouter: UILayoutClass): TemplateResult {
        console.log("layouter", layouter)
        const elementLayouter = this.getLayoutClass(entry.layout_settings)
        if (!elementLayouter) return html`Unknown Orchestration Strategy in element ${id}`

        let style = layouter.renderLayoutStyles(entry.layout)
        style += style?";":"" + this.getPaddingStyle(entry.layout?.padding)

        return this.renderLayout(entry, elementLayouter, style)
    }

    renderLayout(layoutSchema: UILayout, layouter: UILayoutClass, style: string='' ) {
        return html`
            <div class="${layouter.cssClass}" style="${style}">
                ${Object.entries(layoutSchema.ui_elements).map(([id, entry]) => this.renderElement(id, entry, layouter))}
            </div>
        `
    }

    render() {
        const layoutClass = this.getLayoutClass(this.ui_schema?.layout_settings)
        if (!layoutClass) return html`Unknown Orchestration Strategy "${this.ui_schema?.layout_settings?.orchestration_strategy}"`
        if (this.ui_schema)
            return this.renderLayout(this.ui_schema, layoutClass)
        else
            return html``

    }
}
