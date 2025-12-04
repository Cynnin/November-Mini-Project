export class Input extends HTMLElement {
  static formAssociated = true;

    constructor() {
        super();
        this.attachShadow ({ mode: "open" });

        this.attachInternals = this.attachInternals();
        this.input = null; 
      }

        connectedCallback () {
        const type = this.getAttribute("type") || "text";
        const placeholder = this.getAttribute("data-placeholder") || "";
        const variant = this.getAttribute("data-variant");
        const name = this.getAttribute("name") || "";

        this.shadowRoot.innerHTML = `
        
        <style>
          :host {
    display:flex;
}

input {
    cursor: auto;
    font-size: var(--text-lg);
    color: var(--color-blue-500);
    width: 100%;
    height: 45px;
    line-height: var(--text-sm-line-height);
    padding-left: calc(var(--spacing) * 10);
    padding-inline: calc(var(--spacing) * 15);
    padding-block: calc(var(--spacing) * 1);
    display: flex;
    min-width: var(--spacing);
    border-width: 1px;
    border-radius: calc(var(--radius) + 4px);
    border-style: var(--border-style);
    border-color: var(--color-gray-200);
    background-color: var(--input-background);
    transition-property: color, box-shadow;
    transition-duration: var(--duration, var(--deafault-transition-duration));
    transition-timing-function: var(--ease, var(--default-transition-timing-function));

    &:focus {
        outline: none;
        border : 3px double var(--color-blue-500);
        box-shadow: var(--color-blue-500);
        transition: box;
        filter: drop-shadow(var(--drop-shadow));
    }
}

::placeholder {
    color: var(--color-gray-400);
}

.variant-tempmail {
    background-image: url("../../Assets/Icons/Tempmail.png") !important;
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: 97% center;
}
        </style>

        <input type="${type}" 
        name="${name}"
        placeholder="${placeholder}" 
        class="imp"
        part="input">
        `;
    
this.input = this.shadowRoot.querySelector(".imp");

        if(variant) {
            this.shadowRoot.querySelector(".imp").classList.add(`variant-${variant}`);
        }

        this.input.addEventListener('input', this._updateFormValue.bind(this));

        this._updateFormValue();
         
  }

  _updateFormValue() {
    this.attachInternals.setFormValue(this.input.value);
  }

  get value() {
    return this.input ? this.input.value : '';
  }

  set value(newValue) {
    if (this.input) {
      this.input.value = newValue;
      this._updateFormValue();
    }
  }

  get name() {
    return this.getAttribute('name');
  }

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }
}
