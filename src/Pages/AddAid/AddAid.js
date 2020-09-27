import React from "react";
import LoginRequired from "../LoginRequired/LoginRequired";

class AddAid extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		if (!this.props.user.currentUser || !window.localStorage.getItem("token"))
			return <LoginRequired />;
		return <div></div>;
	}
}

export default AddAid;
