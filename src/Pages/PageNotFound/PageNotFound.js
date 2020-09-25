import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
	return (
		<div>
			<h1>
				OOps! The Page You are Looking for does not exists. Return{" "}
				<Link to="/">Home</Link>
			</h1>
		</div>
	);
};

export default PageNotFound;
