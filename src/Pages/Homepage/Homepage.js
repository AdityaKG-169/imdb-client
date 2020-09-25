import React from "react";
import BodySearchbox from "../../Components/BodySearchbox/BodySearchbox";
import RewardCourseModal from "../../Components/RewardCourseModal/RewardCourseModal";
import "./homepage.css";
import { Spring } from "react-spring/renderprops";

class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: true,
		};
	}

	componentDidMount() {
		const isModalClosed = window.localStorage.getItem("modal");
		if (isModalClosed === "true") {
			this.setState({
				modal: false,
				currentUser: this.props,
			});
		}
	}

	closeModal = () => {
		this.setState(
			{
				modal: false,
			},
			() => window.localStorage.setItem("modal", "true")
		);
	};

	render() {
		return (
			<div className="homepage">
				{console.log(this.props.user)}
				<section className="homepage__hero-section">
					<BodySearchbox />
					{this.state.modal ? (
						<Spring
							from={{ opacity: 0 }}
							to={{ opacity: 1 }}
							config={{ delay: 1000, duration: 500 }}
						>
							{(props) => (
								<div style={props}>
									<div className="courseModal__main-div">
										<RewardCourseModal
											closeModal={this.closeModal}
											user={this.props.user}
										/>
									</div>
								</div>
							)}
						</Spring>
					) : (
						<div></div>
					)}
				</section>
			</div>
		);
	}
}

export default Homepage;
