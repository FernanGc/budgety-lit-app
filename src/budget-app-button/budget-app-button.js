import { LitElement, html, css } from 'lit-element';

export class BudgetAppButton extends LitElement {
    
    constructor() {
        super();
    }

    static get styles() {
        return css`
            .add_btn {
                outline: none;
                font-size: 14px;
                height: 43px;
                background: none;
                border: 1px solid #e7e7e7;
                width: 100px;
                border-radius: 5px;
                color: inherit;
                cursor: pointer;
                display: inline-block;
                vertical-align: middle;
                line-height: 1.1;
            }

            .add_btn:active { transform: translateY(2px); }
        `;
    }

    render() {
        return html`
            <button class="add_btn" @click="${this.handleClick}">Add</button>
        `;
    }

    handleClick() {
        let myEvent = new CustomEvent('add-btn', {
            bubbles: true,
            composed: true});

        this.dispatchEvent(myEvent);
    }
}

customElements.define('budget-app-button', BudgetAppButton);