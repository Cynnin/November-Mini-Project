export class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow ({ mode: "open" });
      }
        connectedCallback () {
        const variant = this.getAttribute("data-variant");

        this.shadowRoot.innerHTML = `
        
        <link rel="stylesheet" href="./Components/Cards/cards.css"/>
        
        <div class="card">
            <slot></slot>
        </div>
        `;
    
        if(variant) {
 
               this.shadowRoot.querySelector(".card").classList.add(`variant-${variant}`);
        }
         
  }
}


