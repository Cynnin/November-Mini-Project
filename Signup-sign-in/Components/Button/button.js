export class Button extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode:"open"});
    }
  

    connectedCallback() {

       const icon = this.getAttribute("data-icon");
       const variant = this.getAttribute("data-variant");
       //To accept either href or data-href
       const href = this.getAttribute('href') || this.getAttribute('data-href');


             //Different situations for the buttons
             const type = this.getAttribute('type') || 'button';
               const cssHref = new URL('./login-signup-button.css', import.meta.url).href;

    const inner = `
      <link rel="stylesheet" href="${cssHref}">
            <div class="button-wrapper" variant="${variant || ''}">
        ${href ? `<a part="button" class="button ${variant ? `variant-${variant}` : ''}" href="${href}">` : `<button part="button" class="button ${variant ? `variant-${variant}` : ''}" type="${type}">`}
          ${(icon && `<ion-icon name="${icon}"></ion-icon>`) || ""}
          <span class="label"><slot></slot></span>
        ${href ? `</a>` : `</button>`}
        <slot name="navigation"></slot>
      </div>
    `;

             this.shadowRoot.innerHTML = inner;

     const internalButton = this.shadowRoot.querySelector('button');

     if (internalButton) {
        internalButton.addEventListener('click', (e) => {
            e.preventDefault();

            console.log('button clicked!');

            const form = this.closest('form');

            if (form) {

                form.requestSubmit();

            } else {

            this.dispatchEvent(new CustomEvent('submit', {
                bubbles: true,
                composed: true
            }));
        }
        });
     }
             
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
                         //To remove the failing link so there are no multiple attempts
                         linkEl.remove();
                     } catch (err) {
                         //To swallow errors
                     }
                 }, { once: true });
             }

             //To target through external css with ::part
             if (variant) {
                 this.classList.add(`variant-${variant}`);
             }
           
    }
  
}   



