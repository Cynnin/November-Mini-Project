// Welcome message component
export class Greetings extends HTMLElement {
 constructor() {
 super();
 this.attachShadow({ mode: "open" });
 
   
 this.styleContent = `
<style>
 .greeting {
 font-size: 30px;
 font-weight: bold;
 color: var(--text-gray-900);
 margin-top: 8px;
 }
</style>
 `;
   
 this.shadowRoot.innerHTML = this.styleContent + `<div class="greeting greeting-container"></div>`; 
 }

    
 static get observedAttributes() {
 return ["data-name"];
 }

    
 connectedCallback() {
 this.render();
 }

   
 attributeChangedCallback(name, oldValue, newValue) {
 if (name === 'data-name' && oldValue !== newValue) {
this.render();
 }
 }
 
   
 render() {
 const name = this.getAttribute("data-name") || "User"; 
 const greeting = this.getTimeBasedGreeting();
 
        
 const container = this.shadowRoot.querySelector('.greeting-container'); 
 
       
 if (container) {
container.textContent = `${greeting}, ${name}!`;
 }
 }

 getTimeBasedGreeting() {
 const hour = new Date().getHours();
 if (hour < 12) {
return 'Good Morning';
 } else if (hour < 18) {
return 'Good Afternoon';
 } else {
return 'Good Evening';
 }
 }
}