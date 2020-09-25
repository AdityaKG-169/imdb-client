import React from "react";
import "./rewardcoursemodal.css";
import Loading from "../../assets/loading.svg";

class RewardCourseModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rewardDomain: "",
			message: "",
			loading: false,
			currentUser: this.props.user,
		};
	}

	handleChange = (event) => {
		this.setState({
			rewardDomain: event.target.value.toLowerCase(),
		});
	};

	handleSubmit = () => {
		if (!window.localStorage.getItem("token") || !this.props.user.currentUser)
			return this.setState({
				message: "You Need to login in order to Submit",
			});

		if (!this.state.rewardDomain)
			return this.setState({
				message: "Please Select One to Submit!",
			});

		this.setState(
			{
				loading: true,
			},
			() =>
				fetch("http://localhost:8080/chosereward", {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + window.localStorage.getItem("token"),
					},
					body: JSON.stringify({ rewardDomain: this.state.rewardDomain }),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.error) {
							return this.setState({
								loading: false,
								message: data.error,
							});
						} else return this.props.closeModal();
					})
		);
	};

	render() {
		const domains = [
			"Entrepreneurship",
			"Finance",
			"Design",
			"Development",
			"Programming",
		];

		return (
			<div className="courseModal">
				{console.log(this.props.user.currentUser)}
				<span
					onClick={this.props.closeModal}
					className="courseModal__close-button"
				>
					X
				</span>
				<p className="courseModal__heading">Get Free Courses of Your choice</p>
				<p className="courseModal__subHeading">
					Rate or Add new Courses and Get{" "}
					<span className="subHeading__bold">FREE</span> courses. Choose your{" "}
					<span className="subHeading__bold">Favourite!</span>
				</p>

				<select className="custom-select" onClick={this.handleChange}>
					<option disabled={true} selected={true}>
						Select
					</option>
					{domains.map((i, j) => {
						return <option key={j}>{i}</option>;
					})}
				</select>

				<button className="btn btn-primary" onClick={this.handleSubmit}>
					{this.state.loading ? (
						<img src={Loading} width="25px" height="auto" />
					) : (
						"Submit"
					)}
				</button>
				{this.state.message ? (
					<div className="alert alert-dismissible alert-danger">
						<strong>{this.state.message}</strong>
					</div>
				) : (
					<div></div>
				)}
			</div>
		);
	}
}

export default RewardCourseModal;
