import { UISchemaUIElementType } from "../uischema";
import { TemplateResult } from "lit";
import { UIElementRenderContext } from "../uielementrendercontext";
export declare class UIElement {
    static haulData(context: UIElementRenderContext, value?: string, id?: string): any;
    static devInfo(context: UIElementRenderContext, ...texts: Array<string | undefined>): TemplateResult<1> | TemplateResult<1 | 2>[];
    static render(_context: UIElementRenderContext, id: string): TemplateResult;
    static isVisible(context: UIElementRenderContext, value: any): boolean;
    static isIdentifier(context: UIElementRenderContext): boolean;
    static getStyleSetting(element: UISchemaUIElementType, attribute: string, _default: string): string;
    static getStyleTextAlign(element: UISchemaUIElementType): "" | "text-align: left" | "text-align: right" | "text-align: center";
    static addStyle(currentStyles: string, newStyle: string): string;
    static defaultAction(element: UISchemaUIElementType): string | undefined;
}
