export class MainContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow ({ mode: "open" });

        this.shadowRoot.innerHTML = `
        
        <link rel="stylesheet" href="./Patterns/Container/maincontainer.css">

        <div id ="maincontainer">
        <slot></slot>
        </div>

        `;   
       
  }
}


