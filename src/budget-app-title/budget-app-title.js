import { LitElement, html, css } from 'lit-element';

export class BudgetAppTitle extends LitElement {
    static get properties() {
        return {
            month: { type: String }
        };
    }

    static get styles() {
        return css`
            .budget__title {
                font-size: 18px;
                text-align: center;
                margin-bottom: 10px;
                font-weight: 300;
            }
        `;
    }
    
    constructor() {
        super();
        this.month = 'Undefined';
    }

    render() {
        return html`
            <div class="budget__title">
                Available Budget in <span class="budget__title--month">${this.month}</span>
            </div>
        `;
    }
}

customElements.define('budget-app-title', BudgetAppTitle);