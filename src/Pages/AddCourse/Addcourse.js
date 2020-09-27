import React from "react";
import "./addcourse.css";
import LoginRequired from "../LoginRequired/LoginRequired";

class Addcourse extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inList: true,
			domains: [],
			subDomains: [],
			domain: "",
			subDomain: "",
			name: "",
			link: "",
			platform: "",
			message: "",
			error: false,
		};
	}

	componentDidMount() {
		console.log("mounted");

		fetch("http://localhost:8080/courses/domains")
			.then((response) => response.json())
			.then((data) => {
				return this.setState({
					domains: data.message,
				});
			});
	}

	handleInputSelect = (event) => {
		if (event.target.name === "domain") {
			this.setState({
				domain: event.target.value,
				subDomain: "",
				inList: false,
			});
		}
	};

	handleChange = (event) => {
		const { name, value, className } = event.target;

		if (name === "domain") {
			this.setState(
				{
					domain: value,
					subDomain: "",
				},
				() => {
					if (className === "domain_radio") {
						this.setState(
							{
								inList: true,
							},
							() => {
								if (this.state.inList) {
									fetch(
										`http://localhost:8080/courses/subdomains/${this.state.domain}`
									)
										.then((response) => response.json())
										.then((data) => {
											return this.setState({
												subDomains: data.message,
											});
										});
								}
							}
						);
					}
				}
			);
		} else {
			this.setState({
				[name]: value,
			});
		}
	};

	handleSubmit = () => {
		const { name, link, domain, subDomain, platform } = this.state;

		if (!name || !link || !domain || !subDomain || !platform) {
			return this.setState({
				message: "Please fill all the fields!",
				error: true,
			});
		}

		fetch("http://localhost:8080/course", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: window.localStorage.getItem("token"),
			},
			body: JSON.stringify(this.state),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.message) {
					this.setState({
						inList: true,
						domains: [],
						subDomains: [],
						domain: "",
						subDomain: "",
						name: "",
						link: "",
						platform: "",
						message: data.message,
						error: false,
					});
				} else {
					this.setState({
						inList: true,
						domains: [],
						subDomains: [],
						domain: "",
						subDomain: "",
						name: "",
						link: "",
						platform: "",
						message: data.error,
						error: true,
					});
				}
			});
	};

	componentDidUpdate() {
		console.log(this.props.user.currentUser);
	}

	render() {
		if (!this.props.user.currentUser || !window.localStorage.getItem("token"))
			return <LoginRequired />;
		let onlyUnique = (value, index, self) => {
			return self.indexOf(value) === index;
		};
		let allDomains = this.state.domains.map((i, j) => {
			return i.domain;
		});

		let allSubDomains = this.state.subDomains.map((i, j) => {
			return i.subDomain;
		});

		let filteredDomains = allDomains.filter(onlyUnique);

		let filteredSubDomains = allSubDomains.filter(onlyUnique);

		return (
			<div className="addCourseHero">
				{console.log("Mounted0")}
				<div className="addCourse__subBackground">
					<h1>Add a Course</h1>
					<label htmlFor="exampleInputEmail1">Course Name</label>
					<input
						type="text"
						className="form-control"
						placeholder="Enter Course Name"
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<label htmlFor="exampleInputEmail1">Course Link</label>
					<input
						type="text"
						className="form-control"
						placeholder="Enter Course Link"
						name="link"
						value={this.state.link}
						onChange={this.handleChange}
					/>
					<label htmlFor="exampleInputEmail1">Course Platform</label>
					<input
						type="text"
						className="form-control"
						placeholder="Enter Course Platform"
						name="platform"
						value={this.state.platform}
						onChange={this.handleChange}
					/>

					<label htmlFor="exampleInputEmail1">Course Domain</label>
					{filteredDomains.map((i, j) => {
						return (
							<div>
								<input
									type="radio"
									name="domain"
									className="domain_radio"
									value={i}
									checked={this.state.domain === i}
									key={j}
									onChange={this.handleChange}
								/>
								{i}
							</div>
						);
					})}

					<label htmlFor="exampleInputEmail1">Domain Not In List?</label>
					<input
						type="text"
						className="form-control"
						placeholder="Enter Course Domain"
						name="domain"
						onSelect={this.handleInputSelect}
						onChange={this.handleChange}
					/>

					<label htmlFor="exampleInputEmail1">Course SubDomain</label>
					{this.state.inList ? (
						filteredSubDomains.map((i, j) => {
							return (
								<div>
									<input
										type="radio"
										name="subDomain"
										value={i}
										key={j}
										checked={this.state.subDomain === i}
										onChange={this.handleChange}
									/>
									{i}
								</div>
							);
						})
					) : (
						<input
							type="text"
							className="form-control"
							placeholder="Enter Course SubDomain"
							name="subDomain"
							value={this.state.subDomain}
							onChange={this.handleChange}
						/>
					)}
					{this.state.inList ? (
						<div>
							<label htmlFor="exampleInputEmail1">Subdomain Not in List?</label>
							<input
								type="text"
								className="form-control"
								placeholder="Enter Course SubDomain"
								name="subDomain"
								value={this.state.subDomain}
								onChange={this.handleChange}
							/>
						</div>
					) : (
						<div></div>
					)}

					<button
						type="button"
						className="btn btn-primary"
						onClick={this.handleSubmit}
					>
						Submit
					</button>
					{this.state.message ? (
						this.state.error ? (
							<div class="alert alert-dismissible alert-danger">
								<button
									type="button"
									class="close"
									data-dismiss="alert"
									onClick={() => this.setState({ message: "", error: false })}
								>
									&times;
								</button>
								<strong>{this.state.message}</strong>
							</div>
						) : (
							<div class="alert alert-dismissible alert-info">
								<button
									type="button"
									class="close"
									data-dismiss="alert"
									onClick={() => this.setState({ message: "", error: false })}
								>
									&times;
								</button>
								<strong>{this.state.message}</strong>
							</div>
						)
					) : (
						<div></div>
					)}
				</div>
			</div>
		);
	}
}

export default Addcourse;
