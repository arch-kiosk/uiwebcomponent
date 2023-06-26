import {UISchemaLayoutSettings, UISchemaUIElementLayoutSettings} from "./uischema"
export abstract class UILayoutClass {
    layoutSettings?: UISchemaLayoutSettings
    abstract cssClass: string
    constructor(layoutSettings?: UISchemaLayoutSettings) {
        this.layoutSettings = layoutSettings
    }
    abstract renderLayoutStyles(layout?: UISchemaUIElementLayoutSettings) : string
}

export class UIColumnLayoutClass extends UILayoutClass {
    cssClass = "ui-column-layout"

    renderLayoutStyles(layout?: UISchemaUIElementLayoutSettings): string {
            const min_width = layout?.min_width
            let style = ""
            if (min_width) {
                if (min_width === "max") {
                    style = 'grid-column: 1 / -1;'
                } else {
                    style = `grid-column-end: span ${min_width}`
                }
            }
            return style
    }
}

export class UIStackLayoutClass extends UILayoutClass {
    cssClass = "ui-stack-layout"
    renderLayoutStyles(layout?: UISchemaUIElementLayoutSettings): string {
        const min_width = layout?.min_width
        let style = ""
        if (min_width) {
            if (min_width === "max") {
                style = 'width: 100%'
            } else {
                style = `width: ${min_width * 100}px`
            }
        }
        return style
    }
}

export class UIRightAlignLayoutClass extends UILayoutClass {
    cssClass = "ui-right-align-layout"
    renderLayoutStyles(): string {
        return ""
    }

}