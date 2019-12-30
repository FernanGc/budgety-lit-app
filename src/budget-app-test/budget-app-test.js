// import { BudgetAppTest } from '../budget-app-test/budget-app-test'
import { LitElement, html, css } from 'lit-element';

class BudgetAppTest extends LitElement {
    static get styles() {
        return css`
            :host { 
                /* display: block; */
                color: var(--my-element-text-color, blue);
            }

            :host([hidden]) {
                display: none;
            }
        `;
    }

    render() {
        return html`<p>some text for test</p>`;
    }
}

customElements.define('budget-app-test', BudgetAppTest);