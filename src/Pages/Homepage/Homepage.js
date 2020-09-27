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
				<section className="homepage__hero-section">
					<div className="home__hero-container">
						<BodySearchbox />
					</div>
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

//<span>Photo by <a href="https://unsplash.com/@ilyapavlov?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Ilya Pavlov</a> on <a href="https://unsplash.com/t/technology?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
