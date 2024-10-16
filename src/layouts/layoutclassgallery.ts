import {UISchemaUIElement, UISchemaUIElementLayoutSettings} from "../uischema";
import {html, nothing, TemplateResult} from "lit";
import {UILayoutRenderContext} from "../uielementrendercontext";
import {UILayoutClass, UIListLayoutClass} from "./uilayoutclass";

export class UIGalleryLayoutClass extends UIListLayoutClass {
    cssClass = "ui-gallery-layout"
    renderElementLabels = false
    _sortOrder: Array<string> = []

    // @state()
    selectedItem: string | undefined;

    // @ts-ignore
    renderLayoutStyles(layout?: UISchemaUIElementLayoutSettings): string {
        let style = ""
        return style
    }

    public itemClicked(e: MouseEvent) {
        // todo: refactor
        // this is a super hacky solution because it undermines the declarative architecture
        // but because right now there is no "store" that all elements could use
        // this is the best I can think of right now.

        if (e.target instanceof HTMLElement) {
            if (e.target.tagName === "FILE-VIEW") {
                e.stopPropagation()
                let parent: HTMLElement | null = e.target.parentElement
                let gallery: HTMLElement |undefined = undefined
                let selectedItem: HTMLElement |undefined = undefined
                while (parent) {
                   if (parent.classList.contains("gallery-item")) selectedItem = parent;
                   if (parent.classList.contains("ui-gallery-layout")) {
                       gallery = parent;
                       break;
                   }
                   if (parent.tagName === "ui-component") {
                       parent = null
                   } else {
                       parent = parent.parentElement
                   }
                }
                if (selectedItem && gallery)  {
                    let elements = gallery.querySelectorAll(".gallery-item-selected")
                    elements.forEach(e => {console.log(e); e.classList.remove("gallery-item-selected")})
                    selectedItem.classList.add("gallery-item-selected")
                }
            }
        }
    }

    public renderLayout(renderContext: UILayoutRenderContext, layouter: UILayoutClass, style: string,
                        renderElement: (id: string, entry: UISchemaUIElement, layouter: UILayoutClass) => TemplateResult): TemplateResult {
        const elements = this.getOrderedElements(renderContext.entry)

        const items: TemplateResult[] = []
        renderContext.resetCursor()
        this._initSorting(renderContext)
        while (renderContext.next()) {
            items.push(html`
                <div id="R${renderContext.getCurrentUID()?renderContext.getCurrentUID():nothing}" class="gallery-item " @click="${this.itemClicked}">
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
