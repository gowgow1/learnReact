class Service {
	_apiBase = 'http://localhost:3000';

	async createApi(method, url, body = null, authorization = null) {
		const response = await fetch(this._apiBase + url, {
			method,
			body: body ? JSON.stringify(body) : null,
			headers: {
				'Content-Type': 'application/json',
				Authorization: authorization,
			},
		});
		return response.json();
	}

	async userLogin(body) {
		return this.createApi('POST', '/login', body);
	}

	async userRegistration(body) {
		return this.createApi('POST', '/register', body);
	}

	async getCourses() {
		return this.createApi('GET', '/courses/all');
	}

	async deleteCourse(id, token) {
		return this.createApi('DELETE', `/courses/${id}`, null, token);
	}

	async getAuthors() {
		return this.createApi('GET', `/authors/all`);
	}

	async getUser(token) {
		return this.createApi('GET', '/users/me', null, token);
	}

	async updateCourse(id, body, token) {
		return this.createApi('PUT', `/courses/${id}`, body, token);
	}

	async addCourse(body, token) {
		return this.createApi('POST', `/courses/add`, body, token);
	}

	async addAuthor(body, token) {
		return this.createApi('POST', `/authors/add`, body, token);
	}
}

export const service = new Service();
