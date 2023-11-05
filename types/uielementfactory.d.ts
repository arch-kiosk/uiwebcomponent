import { UIElement } from "./uielements/uielement";
export interface UIElementFactory {
    getUIElementClass(elementTypeName: string): typeof UIElement;
}
export declare class UIConfigurableElementFactory implements UIElementFactory {
    private _elementClasses;
    addUIElementClass(elementTypeName: string, elementClass: typeof UIElement): void;
    getUIElementClass(elementTypeName: string): typeof UIElement;
}
