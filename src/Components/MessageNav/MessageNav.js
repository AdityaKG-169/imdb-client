import React from "react";
import { Link } from "react-router-dom";
import "./messagenav.css";

const MessageNav = (props) => {
	return (
		<div className="alert alert-dismissible alert-info">
			<button
				type="button"
				className="close"
				data-dismiss="alert"
				onClick={props.closeMessage}
			>
				&times;
			</button>
			We are currently new. If you find any <span>bugs or errors</span>, please
			report them <Link to="/bug">Here</Link> or press{" "}
			<span className="span__button">Ctrl + B</span>.{" "}
			<span>In return, we promise a free course of your choice :)</span>
		</div>
	);
};
export default MessageNav;
