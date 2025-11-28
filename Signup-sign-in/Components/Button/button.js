export class Button extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode:"open"});
    }
  

    connectedCallback() {

       const icon = this.getAttribute("data-icon");
       const variant = this.getAttribute("data-variant");
       // Accept either `href` (preferred) or legacy `data-href`
       const href = this.getAttribute('href') || this.getAttribute('data-href');
             // Render an anchor when href is present, otherwise a button element.
             // Load the component CSS from the module-relative path so it resolves correctly
             // regardless of the page that imports this module.
             const cssHref = new URL('./login-signup-button.css', import.meta.url).href;
             const inner = `
                <link rel="stylesheet" href="${cssHref}">

                ${href ? `<a part="button" class="button ${variant ? `variant-${variant}` : ''}" href="${href}">` : `<button part="button" class="button ${variant ? `variant-${variant}` : ''}" type="button">`}
                    ${ (icon && `<ion-icon name="${icon}"></ion-icon>`) || "" }
                    <span class="label"><slot></slot></span>
                ${href ? `</a>` : `</button>`}
             `;

             this.shadowRoot.innerHTML = inner;

             // Fallback: if the <link> fails to load (network/CORS issues), fetch the CSS
             // and inject it into the shadow root as a <style> so the component stays styled.
             const linkEl = this.shadowRoot.querySelector('link[rel="stylesheet"]');
             if (linkEl) {
                 linkEl.addEventListener('error', async () => {
                     try {
                         const resp = await fetch(cssHref, { cache: 'no-store' });
                         if (!resp.ok) return;
                         const cssText = await resp.text();
                         const styleEl = document.createElement('style');
                         styleEl.textContent = cssText;
                         this.shadowRoot.appendChild(styleEl);
                         // remove the failing link so there's no duplicate attempt
                         linkEl.remove();
                     } catch (err) {
                         // swallow errors - best-effort fallback
                         // console.debug('Button CSS fallback failed', err);
                     }
                 }, { once: true });
             }

             // Mirror the variant as a host-class so external (light DOM) CSS can target via ::part
             if (variant) {
                 this.classList.add(`variant-${variant}`);
             }
    }

    
}


