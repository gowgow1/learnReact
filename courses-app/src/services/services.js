class Service {
	_apiBase = 'http://localhost:3000';

	default(body) {
		if (body) {
			return {
				body: JSON.stringify(body),
				headers: { 'Content-Type': 'application/json' },
			};
		} else {
			return { headers: { 'Content-Type': 'application/json' } };
		}
	}

	async userLogin(body) {
		const response = await fetch(this._apiBase + '/login', {
			method: 'POST',
			...this.default(body),
		});

		return response.json();
	}

	async userRegistration(body) {
		const response = await fetch(this._apiBase + '/register', {
			method: 'POST',
			...this.default(body),
		});

		return response.json();
	}

	async getCourses() {
		const response = await fetch(this._apiBase + '/courses/all', {
			method: 'GET',
			...this.default(),
		});

		return response.json();
	}

	async getAuthors() {
		const response = await fetch(this._apiBase + '/authors/all', {
			method: 'GET',
			...this.default(),
		});

		return response.json();
	}
}

export const service = new Service();
