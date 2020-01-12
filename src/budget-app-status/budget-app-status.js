import { LitElement, html, css } from 'lit-element';

export class BudgetAppStatus extends LitElement {
    static get properties() {
        return {
            status: { type: String },
            value: { type: String },
            percentage: { type: String },
        };
    }

    constructor() {
        super();
        this.percentage = '--';
    }

    static get styles() {
        return css`
            .clearfix::after {
                content: "";
                display: table;
                clear: both;
            }

            .right { float: right; }

            .budget__income,
            .budget__expenses {
                padding: 12px;
                text-transform: uppercase;
            }

            .budget__income {
                margin-bottom: 10px;
                background-color: #28B9B5;
            }

            .budget__expenses {
                background-color: #FF5049;
            }

            .budget__income--text,
            .budget__expenses--text {
                float: left;
                font-size: 13px;
                color: #444;
                margin-top: 2px;
            }

            .budget__income--value,
            .budget__expenses--value {
                letter-spacing: 1px;
                float: left;
            }

            .budget__income--percentage,
            .budget__expenses--percentage {
                float: left;
                width: 34px;
                font-size: 11px;
                padding: 3px 0;
                margin-left: 10px;
            }

            .budget__expenses--percentage {
                background-color: rgba(255, 255, 255, 0.2);
                text-align: center;
                border-radius: 3px;
            }
        `;
    }

    render() { 
        return html`
            <div class="budget__${this.status} clearfix">
                <div class="budget__${this.status}--text">${this.status}</div>
                <div class="right ${this.status === 'expenses' ? 'clearfix' : ''}">
                    <div class="budget__${this.status}--value">${this.value}</div>
                    <div class="budget__${this.status}--percentage">${this.percentage}</div>
                </div>
            </div>
        `;
    }
}

customElements.define('budget-app-status', BudgetAppStatus);