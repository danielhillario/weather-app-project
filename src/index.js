const React = require("react");
const { render } = require("react-dom");
const App = require("./components/app");

let target = document.querySelector("div.app");

render(<App />, target);
