export class Tab extends HTMLElement {
    constructor() {
        super();
        this.attachShadow ({ mode: "open" });
      }
        connectedCallback () {
        const variant = this.getAttribute("data-variant");

        this.shadowRoot.innerHTML = `
        
        <link rel="stylesheet" href="./Patterns/Tab/tab.css"/>
        
          <div class="content-container">
              <slot name = "inner-container" class="inner-container">
                 <slot name="muted" class="mute">
                     <slot</slot>
                 </slot>
                 <slot name= "tab" class="tab">
                   <form class="left-hide">
                     <div class="context">
                        <slot>
                        </slot>
                      </div>
                    </form>
                 </slot>
      </div> 
        `;
    
        if(variant) {
 
               this.shadowRoot.querySelector("").classList.add(`variant-${variant}`);
        }
         
  }
}


