export class Input extends HTMLElement {
    constructor() {
        super();
        this.attachShadow ({ mode: "open" });
      }
        connectedCallback () {
        const type = this.getAttribute("type") || "text";
        const placeholder = this.getAttribute("placeholder") || "";
        const variant = this.getAttribute("data-variant");

        this.shadowRoot.innerHTML = `
        
        <link rel="stylesheet" href="./Components/Text-Fields/input.css">

        <input type="${type}" placeholder="${placeholder}" class="imp">
        `;
    
        if(variant) {
            this.shadowRoot.querySelector(".imp").classList.add(`variant-${variant}`);
        }
         
  }
}
