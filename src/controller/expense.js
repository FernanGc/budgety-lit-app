import { Income } from './income';

export class Expense extends Income {
    constructor(id, description, value) {
        super(id, description, value);
    }
}