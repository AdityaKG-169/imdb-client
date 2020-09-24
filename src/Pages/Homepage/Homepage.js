import React from "react";
import BodySearchbox from "../../Components/BodySearchbox/BodySearchbox";
import RewardCourseModal from "../../Components/RewardCourseModal/RewardCourseModal";
import "./homepage.css";
import { Spring } from "react-spring/renderprops";

class Homepage extends React.Component {
	constructor() {
		super();
		this.state = {
			modal: true,
		};
	}

	componentDidMount() {
		const isModalClosed = window.localStorage.getItem("modal");
		if (isModalClosed === "true") {
			this.setState({
				modal: false,
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
										<RewardCourseModal closeModal={this.closeModal} />
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
