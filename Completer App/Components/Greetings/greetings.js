//Welcome message component
export class Greetings extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const name = this.getAttribute("data-name") || "User";
    const greeting = this.getTimeBasedGreeting();

    this.shadowRoot.innerHTML = `
      <style>
        .greeting {
          font-size: 30px;
          font-weight: bold;
          color: var(--text-gray-900);
          margin-top: 8px;
        }
      </style>
      <div class="greeting">${greeting}, ${name}!</div>
    `;
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