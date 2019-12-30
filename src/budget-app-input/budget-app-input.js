import { LitElement, html, css } from 'lit-element';

export class BudgetAppInput extends LitElement {

    static get properties() {
        return {
            type: { type: String },
            placeholder: { type: String },
            value: {type: String }
        };
    }

    constructor() {
        super();
        this.type = 'text';
        this.placeholder = '';
        this.value = '';
    }

    static get styles() {
        return css`
            :host { 
                display: block;
                width: var(--input-width);
            }

            :host([hidden]) {
                display: none;
            }
            
            .add__input {
                outline: none;
                box-sizing: border-box;
                font-size: 14px;
                transition: border 0.3s;
                padding: 12px 15px;
                border-radius: 5px;
                border: 1px solid #e7e7e7;
                background-color: #fff;        
                width: 100%;
            }
        `;
    }

    render() {
        return html`
            <input
                .value="${this.value}"
                class="add__input" 
                type="${this.type}" 
                placeholder="${this.placeholder}" 
                @input=${this.inputChange}>
        `;
    }

    inputChange(e) {
        this.value = e.target.value;
        this.dispatchEvent(new CustomEvent('change', {
          detail: this.value
        }));
    }

}

customElements.define('budget-app-input', BudgetAppInput);