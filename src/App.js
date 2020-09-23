import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import Homepage from "./Pages/Homepage/Homepage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import { auth } from "./firebase/firebase";
import Addcourse from "./Pages/AddCourse/Addcourse";

class App extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<div className="App">
				<Navbar />
				<Switch>
					<Route component={Homepage} exact path="/" />
					<Route component={Addcourse} path="/new" />
					<Route component={PageNotFound} path="*" />
				</Switch>
			</div>
		);
	}
}
export default App;
