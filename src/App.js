import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import Homepage from "./Pages/Homepage/Homepage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import { auth } from "./firebase/firebase";
import Addcourse from "./Pages/AddCourse/Addcourse";
import AdminPage from "./Pages/AdminPage/AdminPage";
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			currentUser: null,
			message: "",
		};
	}

	componentDidMount() {
		if (window.localStorage.getItem("token")) {
			this.setState({ currentUser: true });
		}
		auth.onAuthStateChanged((user) => {
			if (!user) {
				return this.setState({ currentUser: null, message: "" }, () =>
					window.localStorage.removeItem("token")
				);
			}
			const { email, uid } = user;
			this.setState(
				{
					currentUser: true,
				},
				() => {
					if (user) {
						fetch("http://localhost:8080/user", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								email,
								googleId: uid,
							}),
						})
							.then((response) => response.json())
							.then((data) => {
								if (data.error) {
									return auth.signOut();
								}
								this.setState({ message: data.message }, () =>
									window.localStorage.setItem("token", data.token)
								);
							})
							.catch((error) => {
								return auth.signOut();
							});
					}
				}
			);
		});
	}

	render() {
		return (
			<div className="App">
				<Navbar user={this.state} />
				<Switch>
					<Route
						render={(props) => <Homepage {...props} user={this.state} />}
						exact
						path="/"
					/>
					<Route
						render={(props) => <Addcourse {...props} user={this.state} />}
						path="/new"
					/>
					<Route
						render={(props) => <AdminPage {...props} message={this.state} />}
						path="/admin"
					/>
					<Route component={PageNotFound} path="*" />
				</Switch>
			</div>
		);
	}
}
export default App;
