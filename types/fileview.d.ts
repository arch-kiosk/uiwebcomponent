import { LitElement } from 'lit-element';
import { nothing, PropertyValues } from "lit";
declare const FileView_base: typeof LitElement;
export declare class FileView extends FileView_base {
    static styles: import("lit-element").CSSResult;
    private observer?;
    constructor();
    private visible;
    private loadError;
    uuid_file: string;
    resolution: string;
    description: string;
    fitContent: string;
    url: string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Sets the `intersecting` property when the element is on screen.
     * @param  {[IntersectionObserverEntry]} entries
     * @protected
     */
    observerCallback(entries: IntersectionObserverEntry[]): void;
    /**
     * Initializes the IntersectionObserver when the element instantiates.
     * @protected
     */
    initIntersectionObserver(): true | undefined;
    /**
     * Disconnects and unloads the IntersectionObserver.
     * @protected
     */
    disconnectObserver(): void;
    protected clicked(): void;
    protected willUpdate(_changedProperties: PropertyValues): void;
    protected firstUpdated(): void;
    reportURL(url: string | null | unknown): void;
    fetch_image(): void;
    load_image(): void;
    renderImage(): import("lit-html").TemplateResult<1> | typeof nothing;
    renderPlaceholder(): import("lit-html").TemplateResult<1> | typeof nothing;
    renderLoadError(): import("lit-html").TemplateResult<1> | typeof nothing;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
