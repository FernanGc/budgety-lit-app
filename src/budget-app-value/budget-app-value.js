import { LitElement, html, css } from 'lit-element';

export class BudgetAppValue extends LitElement {

  static get properties() {
    return {
      value: { type: String }
    };
  }

  constructor() {
    super();
    this.value = '+ 2,345.64';
  }

  static get styles() {
    return css `
      .budget__value {
        font-weight: 300;
        font-size: 46px;
        text-align: center;
        margin-bottom: 25px;
        letter-spacing: 2px;
      }
    `;
  }

  render() {
    return html`
      <div class="budget__value">${this.value}</div>
    `;
  }
}

customElements.define('budget-app-value', BudgetAppValue);