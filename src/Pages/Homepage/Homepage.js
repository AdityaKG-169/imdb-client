import React from "react";
import BodySearchbox from "../../Components/BodySearchbox/BodySearchbox";
import RewardCourseModal from "../../Components/RewardCourseModal/RewardCourseModal";
import "./homepage.css";
import { Spring } from "react-spring/renderprops";
class Homepage extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<div className="homepage">
				<section className="homepage__hero-section">
					<BodySearchbox />
					<Spring
						from={{ opacity: 0 }}
						to={{ opacity: 1 }}
						config={{ delay: 5000, duration: 1000 }}
					>
						{(props) => (
							<div style={props}>
								<div className="courseModal__main-div">
									<RewardCourseModal />
								</div>
							</div>
						)}
					</Spring>
				</section>
			</div>
		);
	}
}

export default Homepage;
