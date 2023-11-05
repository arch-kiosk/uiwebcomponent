import {UIElement} from "./uielement";
import {nothing, html} from "lit";
import {UIElementRenderContext} from "../uielementrendercontext";
import {UISchemaFile} from "../uischema";

export class UIElementFile extends UIElement {
    static renderLabel(context: UIElementRenderContext, id: string, text: string) {
        return (context.layouter.renderElementLabels) ? html`
            <label for="${id}">${text}
                ${this.devInfo(context, context.entry.element_type.text, context.entry.element_type.value)}
            </label>
        ` : this.devInfo(context, context.entry.element_type.text, context.entry.element_type.value)
    }

    static render(context: UIElementRenderContext, id: string) {
        try {
            // let value = this.haulData(context, context.entry.element_type.value)
            // if (!this.isVisible(context, value)) {
            //     return html`${nothing}`
            // }
            let value = this.haulData(context, context.entry.element_type.value)
            let text = this.haulData(context, context.entry.element_type.text)
            let description = this.haulData(context, `#($/images/descriptions/${value})`)
            let htmlClass = this.getStyleSetting(context.entry.element_type, "classes", "")
            let cssStyle = this.addStyle("", this.getStyleTextAlign(context.entry.element_type))
            let imageElement = context.entry.element_type as UISchemaFile
            let alignFileDescription = imageElement.file_description || "bottom"

            if (context.entry.layout?.max_height) {
                cssStyle = this.addStyle(cssStyle, `max-height: ${context.entry.layout.max_height === "max"? "" : context.entry.layout.max_height + " px"}`)
            }
            if (context.entry.layout?.max_width) {
                cssStyle = this.addStyle(cssStyle, `max-width: ${context.entry.layout.max_width === "max"? "" : context.entry.layout.max_width + " px"}`)
            }

            return context.layouter.renderElement(context.entry.layout, html`
                ${this.renderLabel(context, id, text)}
                <div style="${cssStyle ? cssStyle : nothing}" id=${id} class="read-only-image ${htmlClass}">
                    <div class="${(imageElement.align_image === "left" || imageElement.fit_content === "scale")?'image-left-align':'image-center'}">
                        <file-view 
                                id="${value}" 
                                uuid_file="${value}" 
                                resolution="${imageElement.resolution}" 
                                description=${description} 
                                fitcontent="${imageElement.fit_content || 'contain'}"
                                @fetchfile="${context.uicomponent.fetchFile}">
                        </file-view>
                    </div>
                    ${(alignFileDescription === "bottom" && description)?html`
                            <div class="file-element-description">${description}</div>
                        `:nothing}
                </div>
            `)
        } catch (e) {
            console.error(`UIElementFile.render: ${e} with context`, context)
            throw e
        }
    }
}