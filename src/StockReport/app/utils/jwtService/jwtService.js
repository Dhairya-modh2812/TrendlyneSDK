
import axios from 'axios';

/* eslint-disable camelcase */
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

class JwtService  {
	init() {
		this.setInterceptors();
		// axios.defaults.headers.common['responseCode'] = 'starfolioapi';
	}

	

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
					}
					throw err;
				});
			}
		);
	};

	

	

	get = (route) => {
		axios.defaults.headers.common['requestCode'] = 'Trendlyne';
		return new Promise((resolve, reject) => {
			
			axios
				.get(process.env.STOCK_REPORT_API_URL + route)
				.then(response => {
					if (response.status === 200) {
						resolve(response.data);
					} else {
						reject(response.message);
					}
				}).catch((error) => {
					if (error.response) {
						const {data} = error.response;
						if(data.head.status == "100") {
							// handle 100
						}
						if(data.head.status == "110") {
							// handle 110
						}
						if (error.response.status === 403) {
							// hanlde 403
						}
					}
					reject(error);
				});
		});
	};
}

const instance = new JwtService();

export default instance;
