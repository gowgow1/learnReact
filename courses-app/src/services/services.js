export default class Service {
	_apiBase = 'http://localhost:3000';

	async userLogin(body) {
		const response = await fetch(this._apiBase + '/login', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return await response.json();
	}

	async userRegistration(body) {
		const response = await fetch('http://localhost:3000/register', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return await response.json();
	}
}
