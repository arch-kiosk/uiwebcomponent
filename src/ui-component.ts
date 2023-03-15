import {unsafeCSS, LitElement, TemplateResult, PropertyValues, nothing} from "lit";
import { html } from 'lit/static-html.js'
import { customElement, property, state } from "lit/decorators.js";
import '@vaadin/date-picker'
import '@vaadin/date-time-picker'
import '@vaadin/combo-box'

// import local_css from "/src/static/logviewerapp.sass?inline";
// @ts-ignore
import local_css from "./styles/ui-component.sass?inline";
import {replaceData} from "./tools"
import {
    UISchema,
    UIInputData,
    UISchemaUIElement,
    UISchemaLayoutElement,
    UILayout,
    UISchemaLayoutSettings,
    UISchemaLayoutPadding,
    UISchemaButton,
    UISchemaComboBox,
    UISchemaLookupProvider,
    Dictionary,
    UISchemaUIElementWithId,
    UISchemaTemplateLabel, UISchemaLookupSettings
} from "./uischema";
import {UIStackLayoutClass,UIColumnLayoutClass,UILayoutClass,UIRightAlignLayoutClass} from "./layoutclasses"

@customElement("ui-component")
export class UIComponent extends LitElement {
    static styles = unsafeCSS(local_css);
    _messages: { [key: string]: object } = {};
    _dsd_to_element_list: {[key: string]: UISchemaUIElementWithId} = {}
    _element_list: {[key: string]: UISchemaUIElement} = {}
    _selection_data: {[key: string]: {[key: string]: string}} = {}

    @property()
    uiSchema: UISchema | null = null

    @property()
    data: UIInputData = {}

    @property()
    lookupProvider: UISchemaLookupProvider | null = null

    @state()
    _showError: string | null = null

    constructor() {
        super();
        this._messages = {}
        // this.addEventListener('click', (e) => console.log(e), {capture: true});
    }

    protected willUpdate(_changedProperties: PropertyValues) {
        // super.willUpdate(_changedProperties);
        if (_changedProperties.has("uiSchema")) {
            this.processSchemaDefinition()
        }
    }

    firstUpdated(_changedProperties: any) {
        super.firstUpdated(_changedProperties);


        for (const comboBox of this.renderRoot.querySelectorAll('vaadin-combo-box')) {
            if (comboBox && !comboBox.items && this.lookupProvider) {
                let lookupProvider = this.lookupProvider
                let element = this.getSchemaElement(comboBox.id)
                if (element.element_type.name.toLowerCase() !== "selection")
                    continue
                const selectionElement = (<UISchemaComboBox>element.element_type)
                if (Array.isArray(selectionElement.items))
                    continue

                // comboBox.addEventListener("focus", () => {
                //     this._selection_data = {}
                // })
                // comboBox.addEventListener("blur", () => {
                //     this._selection_data = {}
                // })
                comboBox.dataProvider = async (params, callback) => {
                    if (!(comboBox.id in this._selection_data)) {
                        lookupProvider(comboBox.id,
                            <UISchemaLookupSettings>selectionElement.items,
                            params,
                            (items, size?: number) => {
                                //this is a finite list: The callback gets all items at once.
                                //item[1] is the display value, item[0] is the data value of the selection
                                const valuesOnly = []
                                this._selection_data[comboBox.id] = {}

                                for (const item of items) {

                                    this._selection_data[comboBox.id][item[1]] = item[0]
                                    valuesOnly.push(item[1])
                                }
                                callback(valuesOnly, size)
                            })
                    } else {
                        const values = Object.entries(this._selection_data[comboBox.id]).map(x => x[0]).filter(v => v.startsWith(params.filter))
                        callback(values, values.length)
                    }
                }
            }
        }
    }

    updated(_changedProperties: any) {
        super.updated(_changedProperties);
    }

    getSchemaElement(id: string) {
        return this._element_list[id]
    }

    processSchemaDefinition() {
        function _add_elements(ui_elements?: Dictionary<UISchemaUIElement>) {
            if (ui_elements) {
                Object.entries(ui_elements).map(([id, entry]) => {
                    const regex = new RegExp('^[a-z][a-z0-9\\-_]*$',"gmi")
                    if (!id.match(regex)) {
                        console.log(`element id ${id} is illegal`)
                        showError = `There is an error in the schema definition: the element id "${id}" is illegal. It must start with a letter followed by only letters and numbers`
                        return
                    }
                    if (id in id_list) {
                        console.log(`element id ${id} used more than once in UI schema`)
                        showError = `There is an error in the schema definition: the element id "${id}" is used more than once in the UI schema`
                        return
                    }
                    id_list.push(id)
                    const dsd_field = entry.binding?.field_name?.toLowerCase()
                    if (dsd_field) {
                        if (dsd_field in dsd_to_element_list) {
                            console.log(`dsd field ${dsd_field} bound again in element ${id} in UI schema`)
                            showError = `There is an error in the schema definition: dsd field "${dsd_field}" bound again in element "${id}" in UI schema`
                        } else {
                            dsd_to_element_list[dsd_field] = {"id": id, "element": entry}
                        }
                    }
                    element_list[id] = entry
                    if (entry.element_type.name === "layout") {
                        _add_elements((<UISchemaLayoutElement>entry.element_type).ui_elements)
                    }
                })
            }
        }

        this._dsd_to_element_list = {}
        const id_list: Array<string> = []
        let showError = ""
        const dsd_to_element_list = this._dsd_to_element_list
        const element_list = this._element_list
        if (this.uiSchema) {
            _add_elements(this.uiSchema.ui_elements)
        }
        this._showError = showError
        console.log(this._dsd_to_element_list)
    }

    gatherData() {
        const result: {[key: string]: any} = {}
        if (!this._dsd_to_element_list || Object.keys(this._dsd_to_element_list).length === 0) return {}
        Object.entries(this._dsd_to_element_list).map(([dsd_field, element_entry]) => {
            result[dsd_field] = this.get_field_value(element_entry.id, element_entry.element)
        })
        return result
    }

    get_field_value(id: string, element: UISchemaUIElement) {
        const domElement: HTMLFormElement | null = this.renderRoot.querySelector(`#${id}`)
        switch (element.element_type.name.toLowerCase()) {
            case "selection":
                return this.getSelectionValue(id, domElement)
            default: return domElement?.value?domElement?.value:""

        }
    }

    getSelectionValue(id:string, domElement: HTMLFormElement|null) {
        let displayValue = domElement?.value?domElement?.value:""
        let dataValue = domElement?.getAttribute("data-value")
        if (displayValue) {
            if (id in this._selection_data) {
                try{
                    dataValue = this._selection_data[id][displayValue]
                } catch {
                }
            }
        }
        return dataValue?dataValue:""
    }

    fieldChanged(e: Event) {
        if ("currentTarget" in e) {
            const id = (<HTMLElement>e.currentTarget).id
            // const element = this.getSchemaElement(id)
            // if (element.element_type.name.toLowerCase() == "selection") {
            //     this.selectionChanged(<HTMLInputElement>e.currentTarget)
            // }
            const options = {
                detail: {
                    "srcElement": id,
                    "newData": this.gatherData()
                },
                bubbles: true
            }
            this.dispatchEvent(new CustomEvent('dataChanged', options))
        }
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
        const value = replaceData(entry.element_type.value, this.data)
        return html`
            <div class="text-field-div" style="${layouter.renderLayoutStyles(entry.layout)}">
                <label for="${id}">${entry.element_type.text!}</label> 
                <input id=${id} name=${id} type="text" 
                       value="${value || nothing}"
                       @change="${this.fieldChanged}"/>
            </div>
        `
    }

    renderDateField(id: string, entry: UISchemaUIElement, layouter: UILayoutClass) {
        const value = replaceData(entry.element_type.value, this.data)
        return html`
            <div class="text-field-div" style="${layouter.renderLayoutStyles(entry.layout)}">
                <label for="${id}">${entry.element_type.text!}</label> 
                <vaadin-date-picker id=${id} name=${id}
                                    value="${value || nothing}"
                                    @change="${this.fieldChanged}"></vaadin-date-picker>
            </div>
        `
    }

    renderDateTimeField(id: string, entry: UISchemaUIElement, layouter: UILayoutClass) {
        const value = replaceData(entry.element_type.value, this.data)
        return html`
            <div class="text-field-div" style="${layouter.renderLayoutStyles(entry.layout)}">
                <label for="${id}">${entry.element_type.text!}</label> 
                <vaadin-date-time-picker id=${id} name=${id}
                                         value="${value || nothing}"
                                         @change="${this.fieldChanged}"></vaadin-date-time-picker>
            </div>
        `
    }

    renderButton(id: string, entry: UISchemaUIElement) {
        const button = <UISchemaButton>entry.element_type
        let buttonClass = "modal-button"
        let buttonText = ""
        let extraStyle = button.extra_style?button.extra_style:nothing

        switch (button.type) {
            case "cancelButton":
                buttonClass = "modal-cancel"
                break
            case "okButton":
                buttonClass = "modal-ok"
                break
            case "iconButton":
                buttonClass = "modal-round-button"
                buttonText = button.icon!
                break
            default:
                break
        }
        return html`
            <button class="${buttonClass}" style="${extraStyle}" id=${id} name=${id} @click="${this.fieldChanged}"">
                ${buttonText} 
            </button>
        `
    }

    renderComboBox(id: string, entry: UISchemaUIElement, layouter: UILayoutClass) {
        const element = <UISchemaComboBox>entry.element_type
        if (Array.isArray(element.items)) {
            const items = []
            let value = ""
            for (const item of element.items) {
                const itemText = Array.isArray(item)?(item.length > 1?item[1]:item[0]):item
                const itemValue = Array.isArray(item)?item[0]:item
                items.push(itemText)
                if (this.data[id] == itemValue) {
                    const data: Dictionary<string>= {}
                    data[id] = itemText
                    value = replaceData(entry.element_type.value, data)
                }
            }
            console.log("items", items)
            return html`
            <div class="combobox-div" style="${layouter.renderLayoutStyles(entry.layout)}">
                <label for="${id}">${entry.element_type.text!}</label> 
                <vaadin-combo-box id="${id}" name="${id}" .items="${items}"
                                  .selectedItem="${value || nothing}"
                                  @change="${this.fieldChanged}"></vaadin-combo-box>
            </div>
            `
        } else {
            if (element.items && 'topic' in element.items) {
                // if the combobox is dynamic the value in the data MUST be a tuple with
                // [display-value:value]
                let displayValue = ""
                let value = ""
                const elementData = id in this.data?this.data[id]:""
                if (Array.isArray(elementData) && elementData.length == 2) {
                    displayValue = elementData[0]
                    value = elementData[1]
                }

                return html`
                    <div class="combobox-div" style="${layouter.renderLayoutStyles(entry.layout)}">
                        <label for="${id}">${entry.element_type.text!}</label> 
                        <vaadin-combo-box id="${id}" name="${id}"
                                          .selectedItem="${displayValue || nothing}"
                                          value="${displayValue || nothing}"
                                          data-value="${value}"
                                          @change="${this.fieldChanged}"></vaadin-combo-box>
                    </div>
                `
            } else {
                return html`
            <div class="combobox-div" style="${layouter.renderLayoutStyles(entry.layout)}">
                <label for="${id}">${entry.element_type.text!}</label> 
                <div>selection field ${id} is missing a list.</div>
            </div>`
            }
        }
    }

    renderLine(id: string, entry: UISchemaUIElement) {
        return html`
            <div class="ui-line" id="${id}" style="${this.getPaddingStyle(entry.element_type.padding).replace("padding", "margin")}">
            </div>
        `
    }

    renderTemplateLabel(id: string, entry: UISchemaUIElement, layouter: UILayoutClass) {
        const templateLabel = <UISchemaTemplateLabel>entry.element_type
        const value = replaceData(entry.element_type.value, this.data)
        const htmlClass = templateLabel.style?`templateLabel ${templateLabel.style}`:'templateLabel'
        return html`
            <div class="text-field-div" style="${layouter.renderLayoutStyles(entry.layout)}">
                ${entry.element_type.text?html`<label for="${id}">${entry.element_type.text!}</label>`:nothing} 
                <div class="${htmlClass}" id=${id}>
                    ${value || nothing}
                </div>
            </div>
        `
    }

    renderElement(id: string, entry: UISchemaUIElement, layouter: UILayoutClass) {
        switch (entry.element_type.name.toLowerCase()) {
            case "textfield":
                return this.renderTextField(id, entry, layouter)
            case "templatelabel":
                return this.renderTemplateLabel(id, entry, layouter)
            case "selection":
                return this.renderComboBox(id, entry, layouter)
            case "datefield":
                return this.renderDateField(id, entry, layouter)
            case "datetimefield":
                return this.renderDateTimeField(id, entry, layouter)
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
        console.log("rendering...")
        const layoutClass = this.getLayoutClass(this.uiSchema?.layout_settings)
        if (!layoutClass) {
            this._showError = `The schema definition is calling an unknown Orchestration Strategy "${this.uiSchema?.layout_settings?.orchestration_strategy}"`
        }
        if (this._showError) {
            return html`<div style="background-color: var(--col-bg-alert); color: var(--col-primary-bg-alert); padding: .5em; font-family: monospace">${this._showError}</div>`
        } else {
            if (this.uiSchema && layoutClass)
                return this.renderLayout(this.uiSchema, layoutClass)
            else
                return html``
        }
    }
}
