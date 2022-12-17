import { LitElement, html, css } from "lit";

export class AppCounter extends LitElement {
  static properties = {
    seconds: { type: Number },
    _counting: { type: Boolean },
  };

  static styles = css`
    h1 {
      font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
        Helvetica, Arial, sans-serif;
      background-color: blue;
      color: #ffffff;
      padding: 5px;
      width: 300px;
    }
  `;

  constructor() {
    super();
    this.seconds = 0;
    this._counting = false;
  }

  render() {
    return this.seconds > 0 ? html` <h1>${this.seconds}</h1>` : "";
  }

  updated() {
    if (this.seconds > 0 && !this._counting) {
      this._startCounting();
    }
  }

  _startCounting() {
    if (this.seconds > 0) {
      this.seconds--;
      this._counting = true;
      setTimeout(() => {
        this._startCounting();
      }, 1000);
    } else {
      this._counting = false;
      this._handleFinish();
    }
  }

  _handleFinish() {
    const options = {
      composed: true,
    };

    this.dispatchEvent(new CustomEvent("_didFinish", options));
  }
}

customElements.define("app-counter", AppCounter);
