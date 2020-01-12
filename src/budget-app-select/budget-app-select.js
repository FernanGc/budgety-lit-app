import { LitElement, html, css } from 'lit-element';

export class BudgetAppSelect extends LitElement {
    static get properties() {
        return {
        };
    }

    constructor() {
        super();
        this.data = [
            { value: "income", text: "+" },
            { value: "expenses", text: "-" },
        ];

        this.value = '';
    }

    static get styles() {
        return css`
            .add__type {
                outline: none;
                width: 55px;
                border: 1px solid #e7e7e7;
                height: 44px;
                font-size: 18px;
                color: inherit;
                background-color: #fff;
                margin-right: 10px;
                font-weight: 300;
                transition: border 0.3s;
            }
        `;
    }

    render() {
        return html`
            <select class="add__type" @change="${this.type}">
                ${this.data.map(option => html`<option value="${option.value}">${option.text}</option>`)}
            </select>
        `;
    }
}

customElements.define('budget-app-select', BudgetAppSelect);