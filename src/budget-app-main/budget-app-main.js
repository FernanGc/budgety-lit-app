import { LitElement, html, css } from 'lit-element';
import { BudgetAppTitle } from '../budget-app-title/budget-app-title';
import { BudgetAppValue } from '../budget-app-value/budget-app-value';
import { BudgetAppStatus } from '../budget-app-status/budget-app-status';
import { BudgetAppRow } from '../budget-app-row/budget-app-row';
import { BudgetAppSelect } from '../budget-app-select/budget-app-select';
import { BudgetAppInput } from '../budget-app-input/budget-app-input'; 
import { BudgetAppButton } from '../budget-app-button/budget-app-button';

export default class BudgetAppMain extends LitElement {
    static get properties() {
        return {
            add__description: { type: String },
            add__value: { type: String },
        }
    }

    constructor() {
        super();
        this.add__type = 'inc';
        this.add__description = '';
        this.add__value = '';
    }

    static get styles() {
        return css`            
            .top {
                height: 40vh;
                background-image: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(../../img/back.jpeg);
                background-size: cover;
                background-position: center;
                position: relative;
            }

            .budget {
                width: 350px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #fff;
                position: absolute;
            }

            /* Bottom part */

            /* Form */
            .add { 
                padding: 14px;
                border-bottom: 1px solid #e7e7e7;
                background-color: #f7f7f7;
            }

            .add__container {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto;
                text-align: center;
            }

            /* List */

            .container {
                width: 1000px;
                margin: 60px auto;
            }

            .add__description {
                --input-width: 400px;
                margin-right: 10px;
            }

            .add__value {
                --input-width: 100px;
                margin-right: 10px;
            }
        `;
    }

    render() {
        return html`
            <div class="top">
                <div class="budget">
                    <budget-app-title month="December"></budget-app-title>
                    <budget-app-value value="- 0.00"></budget-app-value>
                    <budget-app-status status="income" value="+ 4,300.00"></budget-app-status>
                    <budget-app-status status="expenses" value="- 1,954.36" percentage="45%"></budget-app-status>
                </div> 
            </div>

            <div class="bottom">
                <div class="add">
                    <div class="add__container">
                        <budget-app-select
                            id="add__type"
                            .onChange="${ (e) => this.add__type = e.target.value }">
                        </budget-app-select>
                        <budget-app-input
                            id="add__description"
                            class="add__description"
                            value="${this.add__description}"
                            type="text"
                            placeholder="Add description"
                            @change="${ (e) => this.add__description = e.detail }">
                        </budget-app-input>
                        <budget-app-input 
                            class="add__value"
                            value="${this.add__value}"
                            type="number" 
                            placeholder="Value"
                            @change="${ (e) => this.add__value = e.detail }">
                        </budget-app-input>
                        <budget-app-button @add-btn=${this.addNewItem}></budget-app-button>
                    </div>
                </div>
            </div>

            <div class="container clearfix">
                <budget-app-row type="income" description="Salary" value="+ 12,000.00"></budget-app-row>
                <budget-app-row type="expenses" description="Apartment Rent" value="- 5,000.00" percentage="2%"></budget-app-row>
            </div>
        `;
    }

    addNewItem() { 
        console.log(this.add__type);
        console.log(this.add__description);
        console.log(this.add__value);

        this.add__description = '';
        this.add__value = '';
    }
}

customElements.define('budget-app-main', BudgetAppMain);