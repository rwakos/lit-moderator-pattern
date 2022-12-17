import { LitElement, html } from "lit";
import "../components/counter.js";
import "../components/trigger.js";

export class App extends LitElement {
  static properties = {
    _time: { type: Number },
  };

  constructor() {
    super();
    this._time = 0;
  }

  _start(data) {
    this._time = data.detail.seconds;
  }

  _finish() {
    this._time = 0;
  }

  render() {
    return html`
      <app-trigger @_didStart=${this._start}></app-trigger>
      <app-counter
        @_didFinish=${this._finish}
        .seconds=${this._time}
      ></app-counter>
    `;
  }
}

customElements.define("my-app", App);
