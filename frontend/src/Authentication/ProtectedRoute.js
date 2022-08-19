// import React, { Component } from "react";
// import { Route } from "react-router-dom";
// import auth from "./Auth";
// import { useNavigate } from "react-router-dom";

// export const ProtectedRoute = ({ Component: component, ...rest }) => {
// 	const navigate = useNavigate();
// 	return (
// 		<Route
// 			{...rest}
// 			render={(props) => {
// 				if (auth.isAuthenticated()) {
// 					console.log(auth.isAuthenticated());
// 					return <Component {...props}></Component>;
// 				} else {
// 					navigate("/");
// 				}
// 			}}
// 		/>
// 	);
// };

import { Route } from "react-router-dom";
import auth from "./Auth";
import { useNavigate } from "react-router-dom";
import React, { Component } from "react";

import { Navigate } from "react-router-dom";
class ProtectedRoute extends Component {
	render() {
		if (auth.isAuthenticated()) {
			return { ...this.props.children };
		} else {
			return (
				<h1
					style={{
						textAlign: "center ",
						color: "white",
						marginTop: "20%",
					}}
				>
					You do not have permission to access this page
				</h1>
			); //<Navigate to="/" />
		}
	}
}

export default ProtectedRoute;
