import { LitElement, html } from "lit";

export class AppTrigger extends LitElement {
  static properties = {
    _timer: { type: Number },
    _disabled: { type: Boolean },
  };

  constructor() {
    super();
    this._timer = 0;
    this._disabled = true;
  }

  _updateTimer(e) {
    if (this._isInvalidTimer(e.target.value)) {
      this._disabled = true;
      return;
    }

    this._timer = parseInt(e.target.value, 10);
    this._disabled = false;
  }

  _isInvalidTimer(seconds) {
    return !seconds || isNaN(seconds) || parseInt(seconds, 10) < 4;
  }

  _onSubmit(e) {
    e.preventDefault();
    const options = {
      detail: {
        seconds: this._timer,
      },
      composed: true,
    };

    this.dispatchEvent(new CustomEvent("_didStart", options));
    this._timer = 0;
  }

  render() {
    return html`
      <form @submit=${this._onSubmit}>
        <input
          type="number"
          id="seconds"
          @input=${this._updateTimer}
          .value=${this._timer}
        />
        <button ?disabled=${this._disabled}>Start timer</button>
      </form>
    `;
  }
}

customElements.define("app-trigger", AppTrigger);
