class Auth {
	constructor() {
		this.state = {
			authenticated: false,
		};
	}

	login() {
		this.state.authenticated = true;
	}

	logout() {
		this.state.authenticated = true;
	}

	isAuthenticated() {
		return this.state.authenticated;
	}

}

export default new Auth();
