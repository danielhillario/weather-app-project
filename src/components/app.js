const React = require("react");
const { BrowserRouter, Switch, Route } = require("react-router-dom");
const { render } = require("react-dom");
const Navigation = require("./nav");
const Home = require("./home");
const Weather = require("./weather");
const About = require("./about");

function App() {
    let pageTitle = "Weather Town";

    return (
        <BrowserRouter>
            <Navigation title={pageTitle} />
            <Switch>
                <Route exact={true} path="/">
                    <Home />
                </Route>
                <Route path="/weather">
                    <Weather />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

module.exports = App;