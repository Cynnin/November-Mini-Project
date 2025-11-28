export class HeadCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow ({ mode: "open" });
      }
        connectedCallback () {
        const variant = this.getAttribute("data-variant");

        this.shadowRoot.innerHTML = `
        
        <link rel="stylesheet" href="./Components/GreetingCard/cardheader.css"/>
         <div class = "cardhead">
          <slot name = "logo">
          </slot>

          <slot name = "greeting">

          </slot>
         </div>
        `;
    
        if(variant) {
 
               this.shadowRoot.querySelector(".cardhead").classList.add(`variant-${variant}`);
        }
         
  }
}
