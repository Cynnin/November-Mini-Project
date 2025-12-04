export class Tab extends HTMLElement {
    constructor() {
        super();
        this.attachShadow ({ mode: "open" });
      }
        connectedCallback () {
        const variant = this.getAttribute("data-variant");

        this.shadowRoot.innerHTML = `
        
        <style>
        .content-container {
                    padding-bottom: calc(var(--spacing) * 6);
                    padding-inline: calc(var(--spacing) * 6);
               }

        .inner-container {
                gap:calc(var(--spacing) * 2);
                display:flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
             }
        </style>
        
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


