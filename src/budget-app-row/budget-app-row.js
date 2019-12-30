import { LitElement, html, css } from 'lit-element';

export class BudgetAppRow extends LitElement {
    static get properties() {
        return {
            type: { type: String },
            description: {type: String},
            value: {type: String},
            percentage: {type: String},
        }
    }

    constructor() {
        super();
        this.description = 'Set a description';
        this.value = '0.00';
        this.percentage = '';
    }

    static get styles() {
        return css`
            .clearfix::after {
                content: "";
                display: table;
                clear: both;
            }

            .right { float: right; }

            /* List */
            .income {
                float: left;
                width: 475px;
                margin-right: 50px;
            }

            .expenses {
                float: left;
                width: 475px;
            }

            h2 {
                text-transform: uppercase;
                font-size: 18px;
                font-weight: 400;
                margin-bottom: 15px;
            }

            .income__title {
                color: #28B9B5;
            }
            
            .expenses__title { 
                color: #FF5049;
            }

            .item {
                padding: 13px;
                border-bottom: 1px solid #e7e7e7;
            }

            .item:first-child { border-top: 1px solid #e7e7e7; }
            .item:nth-child(even) { background-color: #f7f7f7; }

            .item__description {
                float: left;
            }

            .item__value {
                float: left;
                transition: transform 0.3s;
            }

            .item__percentage {
                float: left;
                margin-left: 20px;
                transition: transform 0.3s;
                font-size: 11px;
                background-color: #FFDAD9;
                padding: 3px;
                border-radius: 3px;
                width: 32px;
                text-align: center;
            }

            .income .item__value,
            .income .item__delete--btn {
                color: #28B9B5;
            }

            .expenses .item__value,
            .expenses .item__percentage,
            .expenses .item__delete--btn {
                color: #FF5049;
            }

            .item__delete {
                float: left;
            }

            .item__delete--btn {
                font-size: 19px;
                font-weight: 200;
                background: none;
                border: none;
                cursor: pointer;
                display: inline-block;
                vertical-align: middle;
                line-height: 1;
                display: none;
            }

            .item__delete--btn:focus { outline: none; }
            .item__delete--btn:active { transform: translateY(2px); }

            .item:hover .item__delete--btn { display: block; }
            .item:hover .item__value { transform: translateX(-20px); }
            .item:hover .item__percentage { transform: translateX(-20px); }
        `;
    }

    render() {
        return html `
            <div class="${this.type}">
                <h2 class="${this.type}__title">Income</h2>
                <div class="${this.type}__list">
                    <div class="item clearfix">
                        <div class="item__description">${this.description}</div>
                        <div class="right clearfix">
                            <div class="item__value"> + 900.00</div>
                            ${this.percentage ? html`<div class="item__percentage">${this.percentage}</div>` : ''}
                            <div class="item__delete">
                                <button class="item__delete--btn">
                                    <span>x</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

customElements.define('budget-app-row', BudgetAppRow);