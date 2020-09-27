import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import Homepage from "./Pages/Homepage/Homepage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import { auth } from "./firebase/firebase";
import Addcourse from "./Pages/AddCourse/Addcourse";
import AdminPage from "./Pages/AdminPage/AdminPage";
import AddBug from "./Pages/AddBug/AddBug";
import AddAid from "./Pages/AddAid/AddAid";
import Mousetrap from "mousetrap";
import MessageNav from "./Components/MessageNav/MessageNav";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			currentUser: null,
			message: "",
			navMessage: true,
		};
	}

	handleNavMessage = () => {
		this.setState({ navMessage: false });
	};

	componentDidMount() {
		Mousetrap.bind("ctrl+b", () => (window.location.href = "/bug"));
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
				{this.state.navMessage ? (
					<MessageNav closeMessage={this.handleNavMessage} />
				) : (
					<div></div>
				)}

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
					<Route component={AddBug} path="/bug" />
					<Route
						render={(props) => <AddAid {...props} user={this.state} />}
						path="/aid"
					/>
					<Route component={PageNotFound} path="*" />
				</Switch>
			</div>
		);
	}
}
export default App;
