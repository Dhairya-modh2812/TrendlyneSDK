import Cookies from 'js-cookie';
import {handleToaster} from "../_helpers";

export default function setupAxios(axios, store, extraConfigs) {
    
    const { viewType } = extraConfigs || {};

    let apiBaseUrl = process.env.API_URL;
    
    if (viewType === 'trendlyne') apiBaseUrl = '/';
    
    axios.interceptors.request.use(
        config => {
            config.baseURL = apiBaseUrl;
            config.headers['Content-Type'] = 'application/json';
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
            if (Cookies.get('session_token')) {
                config.headers = {
                    'Authorization': Cookies.get('session_token')
                }
            }
            return config;
        },
        err => Promise.reject(err)
    );

    axios.interceptors.response.use(
        response => {
            if(Object.keys(response).length && response.data) {
                const { head={} } = response.data;
                if(head.status == 2) {
                    if(extraConfigs && 'redirect' in extraConfigs & !extraConfigs.redirect) {
                       return response;
                    }
                    window.location.href = "https://trendlyne.com/404/";
                    return;
                } else if(head.status == 4) {
                    window.location.href = "https://trendlyne.com/subscription/plans/";
                    return;
                } else if(head.status == 100) {
                    if(extraConfigs && 'redirect' in extraConfigs & !extraConfigs.redirect) {
                        return response;
                    }
                    window.location.href = "https://trendlyne.com/accounts/login/";
                    return;
                }
            }

            return response;
        },
        error => {
            if(extraConfigs && 'redirect' in extraConfigs & !extraConfigs.redirect) {
                if(error.response.status === 403) {
                    return Promise.reject(error.response);
                } else {
                    handleToaster('Something went wrong, Please try again later.');
                    return Promise.reject(error);
                }
            }

            return new Promise((resolve, reject) => {
                handleToaster('Something went wrong, Please try again later.');
                return reject(error);
            });
        }
    );
}
