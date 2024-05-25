import {UISchemaUIElement, UISchemaUIElementLayoutSettings} from "../uischema";
import {html, nothing, TemplateResult} from "lit";
import {UILayoutRenderContext} from "../uielementrendercontext";
import {UILayoutClass, UIListLayoutClass} from "./uilayoutclass";

export class UIGalleryLayoutClass extends UIListLayoutClass {
    cssClass = "ui-gallery-layout"
    renderElementLabels = false
    _sortOrder: Array<string> = []

    // @ts-ignore
    renderLayoutStyles(layout?: UISchemaUIElementLayoutSettings): string {
        let style = ""
        return style
    }

    public renderLayout(renderContext: UILayoutRenderContext, layouter: UILayoutClass, style: string,
                        renderElement: (id: string, entry: UISchemaUIElement, layouter: UILayoutClass) => TemplateResult): TemplateResult {
        const elements = this.getOrderedElements(renderContext.entry)

        const items: TemplateResult[] = []
        renderContext.resetCursor()
        this._initSorting(renderContext)
        while (renderContext.next()) {
            items.push(html`
                <div id="R${renderContext.getCurrentUID()?renderContext.getCurrentUID():nothing}" class="gallery-item">
                    ${elements.map((id) => renderElement(id, renderContext.entry.ui_elements[id], layouter))}
                </div>
            `)
        }

        return html`
            <div class="${this.cssClass}" style="${style}">
                ${items}
            </div>
        `
    }


    renderElement(layout: UISchemaUIElementLayoutSettings|undefined, element: TemplateResult): TemplateResult {
        return html`
            <div class="gallery-sub-item" style="${this.renderLayoutStyles(layout)}">
                ${element}
            </div>
        `
    }
}
