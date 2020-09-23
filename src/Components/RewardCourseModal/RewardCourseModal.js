import React from "react";
import "./rewardcoursemodal.css";

class RewardCourseModal extends React.Component {
	constructor() {
		super();
		this.state = {
			isOther: false,
			isSelected: false,
			color: "white",
			backgroundColor: "black",
		};
	}

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
				<p className="courseModal__heading">Get Free Courses of Your choice</p>
				<p className="courseModal__subHeading">
					Rate or Add new Courses and Get free courses. Chose your favourite
					domain!
				</p>
				<section className="courseModal__buttons">
					{domains.map((i, j) => {
						return (
							<button
								type="button"
								style={{
									color: this.state.color,
									backgroundColor: this.state.backgroundColor,
								}}
								onSelect={() =>
									this.setState({
										color: "white",
										backgroundColor: "black",
									})
								}
								key={j}
								class="btn btn-outline-primary"
							>
								{i}
							</button>
						);
					})}

					<button
						type="button"
						class="btn btn-outline-success"
						onClick={() => this.setState({ isOther: true })}
					>
						Other
					</button>
				</section>
				{this.state.isOther ? (
					<input
						type="text"
						class="form-control"
						placeholder="Enter Domain of your Choice"
					/>
				) : (
					<span></span>
				)}
			</div>
		);
	}
}

export default RewardCourseModal;
