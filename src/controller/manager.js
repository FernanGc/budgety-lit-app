import { Income } from './income';
import { Expense } from './expense';

export class Manager {
    constructor() {
        this.data = {
            allItems: {
                expenses: [],
                income: [],
            },
            totals: {
                expenses: 0,
                income: 0,
            },
            budget: 0,
        };
    }

    calculateTotal(type) {
        const budget = this.data.allItems[type];
        const amount = [];

        for (const iterator of budget) {
            amount.push(parseInt(iterator.value));
        }

        this.data.totals[type] = amount.reduce((a, b) => a + b, 0);
    }

    calculateBudget() {
        this.calculateTotal('expenses');
        this.calculateTotal('income');

        // Calculate the budget income - expenses
        this.data.budget = this.data.totals.income - this.data.totals.expenses;
    }

    getBudget() {
        return {
            budget: this.data.budget,
            totalIncome: this.data.totals.income,
            totalExpenses: this.data.totals.expenses,
        };
    }
    
    /* CRUD */

    createItem(type, des, val) {
    
        let newItem;
        let itemId;
    
        // Create a new id
        if (this.data.allItems[type].length > 0) {
            itemId = this.data.allItems[type][this.data.allItems[type].length -1].id + 1;
        } else {
            itemId = 0;
        }
    
        // Create a new item on 'inc' or 'exp' type
        if (type === 'expenses') {
            newItem = new Expense(itemId, des, val);
        } else if (type === 'income') {
            newItem = new Income(itemId, des, val);
        }
    
        // Push the item into our data structure
        this.data.allItems[type].push(newItem);
    
        // return the new element
        return newItem;
    }

    deleteItem(type, id) {

        let ids = this.data.allItems[type].map( current => current.id);
        let index = ids.indexOf(id);
    
        if (index !== -1) {
            this.data.allItems[type].splice(index, 1);
        }
    }

    /* Utilities */
    formatNumber(num, type) {
        num = Math.abs(num);
        num = num.toFixed(2);

        const numSplit = num.split('.');

        let int = numSplit[0];

        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        const dec = numSplit[1];

        return (type === 'expenses' ? '-' : '+') + ' ' + int + '.' + dec;
    }

}
