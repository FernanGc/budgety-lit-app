import { LitElement, html, css } from 'lit-element';
import { BudgetAppTitle } from '../budget-app-title/budget-app-title';
import { BudgetAppValue } from '../budget-app-value/budget-app-value';
import { BudgetAppStatus } from '../budget-app-status/budget-app-status';
import { BudgetAppRow } from '../budget-app-row/budget-app-row';
import { BudgetAppSelect } from '../budget-app-select/budget-app-select';
import { BudgetAppInput } from '../budget-app-input/budget-app-input'; 
import { BudgetAppButton } from '../budget-app-button/budget-app-button';

import { Manager } from '../controller/manager';

export default class BudgetAppMain extends LitElement {
    static get properties() {
        return {
            add__description: { type: String },
            add__value: { type: String },
        }
    }

    constructor() {
        super();
        this.add__type = 'income';
        this.add__description = '';
        this.add__value = '';
        this.manager = new Manager();
    }

    static get styles() {
        return css`
            .clearfix::after {
                content: "";
                display: table;
                clear: both;
            }

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

            .income {
                float: left;
                width: 475px;
                margin-right: 50px;
                color: #28B9B5;
            }

            .expenses {
                float: left;
                width: 475px;
                color: #FF5049;
            }

            h2 {
                text-transform: uppercase;
                font-size: 18px;
                font-weight: 400;
                margin-bottom: 15px;
            }

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
                    <budget-app-value value="- 0.00" id="budgetLabel"></budget-app-value>
                    <budget-app-status status="income" id="incomeLabel"></budget-app-status>
                    <budget-app-status status="expenses" id="expensesLabel"></budget-app-status>
                </div> 
            </div>

            <div class="bottom">
                <div class="add">
                    <div class="add__container">
                        <budget-app-select
                            id="add__type"
                            .type="${ (e) => this.add__type = e.target.value }">
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
                        <budget-app-button @add-btn=${this.addItem}></budget-app-button>
                    </div>
                </div>
            </div>

            <div class="container clearfix">
                <div class="income">
                    <h2 class="income__title">Income</h2>
                    <div class="income__list">
                
                    </div>
                </div>

                <div class="expenses">
                    <h2 class="expenses__title">Expenses</h2>
                    <div class="expenses__list">

                    </div>
                </div>
            </div>
        `;
    }


    addItem() {
        // 1. Get the form data
        let input = this.getInput();
        const totalncome = this.manager.data.totals.income;

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            // 2. Add the item to the budget controller
            const newItem =  this.manager.createItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            this.addListItem(newItem, input.type, totalncome);

            // 4. Clear the fields
            this.clearFields();

            // 5. Calculate and update the budget
            this.updateBudget();
        }
    }

    calculatePercentage(value, totalIncome) {
        if (totalIncome > 0) {
            return Math.round((value / totalIncome) * 100);
        } else {
            return -1;
        }
    }

    addListItem(item, type, totalIncome) {
        const percentage = this.calculatePercentage(item.value, totalIncome);

        if (type === 'income') {
            const container = this.shadowRoot.querySelector('.income__list');

            const html = `
                    <budget-app-row
                        id="income-${item.id}"
                        type="income"
                        description="${item.description}"
                        value="${this.manager.formatNumber(item.value, 'income')}"
                    </budget-app-row>
            `;

            container.insertAdjacentHTML('beforeend', html);

        } else if (type === 'expenses') { 
            const container = this.shadowRoot.querySelector('.expenses__list');
            
            const html = `
                    <budget-app-row 
                        id="expenses-${item.id}"
                        type="expenses" 
                        description="${item.description}" 
                        value="${this.manager.formatNumber(item.value, 'expenses')}"
                        percentage="${percentage}%">
                    </budget-app-row>
            `;
            
            container.insertAdjacentHTML('beforeend', html);
        }
    }

    firstUpdated() {
        this.deleteItems();
    }

    displayBudget(data) {
        const budget = this.shadowRoot.querySelector('#budgetLabel');
        const income = this.shadowRoot.querySelector('#incomeLabel');
        const expenses = this.shadowRoot.querySelector('#expensesLabel');
        
        budget.setAttribute('value', `${this.manager.formatNumber(data.budget, 'income')}`);
        income.setAttribute('value', `${this.manager.formatNumber(data.totalIncome, 'income')}`);
        expenses.setAttribute('value', `${this.manager.formatNumber(data.totalExpenses, 'expenses')}`);
        expenses.setAttribute('percentage', `${this.calculatePercentage(data.totalExpenses, data.totalIncome)}%`);
    }
    
    updateBudget() {
        // 1. Calculate the budget
        this.manager.calculateBudget();
        
        // 2. Return the budget
        const budget = this.manager.getBudget();
        
        //  3. Desiplay the budget on the UI
        this.displayBudget(budget);
    }

    deleteItems() {
        this.shadowRoot.addEventListener('my-event', (e) => {
            const item = e.target.id.split('-');
            const type = item[0];
            const id = parseInt(item[1]);

            // 1. Delete the item from the data sctructure
            this.manager.deleteItem(type, id);

            // 2. delete item from the user interface
            this.deleteListItem(e.target.id);

            // 3 Update the new busget
            this.updateBudget();

            // 4. Calculate and update the percentages
        });
    }

    deleteListItem(selectorId) {
        const el = this.shadowRoot.getElementById(selectorId);
        el.parentNode.removeChild(el);
    }

    getInput() {
        return {
            type: this.add__type,
            description: this.add__description,
            value: this.add__value
        }
    }

    clearFields() {
        this.add__description = '';
        this.add__value = '';
    }
}

customElements.define('budget-app-main', BudgetAppMain);