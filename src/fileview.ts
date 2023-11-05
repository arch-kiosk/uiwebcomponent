import {customElement, LitElement} from 'lit-element';

// @ts-ignore
import local_css from './styles/component-file-view.sass?inline';
import {nothing, PropertyValues, unsafeCSS} from "lit";
import {html} from "lit";
import {property, state} from "lit/decorators.js";
import {UIComponentFileFetchParams} from "./uischema";

@customElement('file-view')
export class FileView extends (LitElement) {
    static styles = unsafeCSS(local_css);

    private observer?: IntersectionObserver = undefined

    constructor() {
        super();
        this.observerCallback = this.observerCallback.bind(this);
    }

    @state()
    private visible = false

    @property()
    uuid_file: string = ""

    @property()
    resolution: string = ""

    @property()
    description: string = ""

    @property()
    fitContent: string = "contain"

    @property()
    url: string = ""

    // get visible() {
    //     return (this._visible)
    // }
    //
    // set visible(value: boolean) {
    //     if (value !== this._visible) {
    //         this._visible = value
    //         this.load_image()
    //     }
    // }

    connectedCallback() {
        super.connectedCallback();
        // Remove the wrapping `<lazy-image>` element from the a11y tree.
        this.setAttribute('role', 'presentation');
        // if IntersectionObserver is available, initialize it.
        this.initIntersectionObserver();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.disconnectObserver();
    }

    /**
     * Sets the `intersecting` property when the element is on screen.
     * @param  {[IntersectionObserverEntry]} entries
     * @protected
     */
    observerCallback(entries: IntersectionObserverEntry[]) {
        // @ts-ignore
        const isIntersecting = ({ isIntersecting }) => isIntersecting;
        if (entries.some(isIntersecting)) {
            this.visible = true;
        }
    }

    /**
     * Initializes the IntersectionObserver when the element instantiates.
     * @protected
     */
    initIntersectionObserver() {
        // if IntersectionObserver is unavailable, simply load the image.
        if (!('IntersectionObserver' in window)) return this.visible = true;
        // Short-circuit if observer has already initialized.
        if (this.observer) return;
        // Start loading the image 10px before it appears on screen
        const rootMargin = '10px';
        this.observer =
            new IntersectionObserver(this.observerCallback, { rootMargin });
        this.observer.observe(this);
        return;
    }

    /**
     * Disconnects and unloads the IntersectionObserver.
     * @protected
     */
    disconnectObserver() {
        this.observer?.disconnect();
        delete this.observer;
        this.observer = undefined;
    }

    protected clicked() {
        this.dispatchEvent(new CustomEvent("select-image",
            {bubbles: true, composed: true, detail: this.uuid_file}));
    }

    protected willUpdate(_changedProperties: PropertyValues) {
        super.willUpdate(_changedProperties);
        if (_changedProperties.has("uuid_file") || _changedProperties.has("resolution"))
            this.url = ""
        if (!this.url) this.load_image()
    }

    protected firstUpdated() {

    }

    public reportURL(url: string) {
        console.log(`GOT URL: ${url} `)
        this.url = url
    }


    fetch_image() {
        this.url = ""

        const detail:UIComponentFileFetchParams = {
            uuid: this.uuid_file,
            resolution: this.resolution,
            reportURL: this.reportURL.bind(this)
        };

        const event = new CustomEvent('fetchfile',
            {detail, bubbles: false, composed: true, cancelable: false});
        this.dispatchEvent(event);
    }


    load_image() {
        if (this.resolution && this.uuid_file) {
            if  (this.visible) {
                this.fetch_image()
            }
        }
    }

    render_image() {
        let cssStyle: string  = ""
        switch(this.fitContent) {
            case "fit":
                cssStyle = "object-fit: scale-down;max-width:100%"
                break
            case "scale":
                cssStyle = "height: 100%;width:100%"
                break
            default:
                cssStyle = "object-fit: contain"
        }

        return this.visible?html`
            <img style="${cssStyle}" 
                 @click="${this.clicked}" src="${this.url}" 
                 alt="${this.description}"/>`:nothing
    }

    render_placeholder() {
        return this.visible?html`
            <div class="placeholder"><i class="fa fa-camera"></i></div>`:nothing
    }

    render() {
        return html`
                    ${this.url
                            ? this.render_image()
                            : this.render_placeholder()}
                    </div>`
    }
}
