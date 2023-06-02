import axios from "axios";

export function searchStock(extraConfig, keyword) {
    if(extraConfig && 'url' in extraConfig) {
        return axios.post(extraConfig.url,
            {
                term: keyword
            },
            {
                headers: extraConfig.headerConfig
            }
        );
    }
    return axios.post('uat0709/uat/brokerwl/search-stock/',
        {
            term: keyword
        },
        {
            headers: {
                'requestCode': 'BrokerAASDK'
            }
        }
    );
}

export function getPriceAlerts(extraConfig) {
    if(extraConfig && 'url' in extraConfig) {
        return axios.post(extraConfig.url,
            {
                clientCode: extraConfig.clientCode
            },
            {
                headers: extraConfig.headerConfig
            }
        );        
    }

    return axios.post('uat0709/uat/brokerwl/get-broker-pricealert/',
        {
            clientCode: 'UATTEST'
        },
        {
            headers: {
                'requestCode': 'BrokerAASDK'
            }
        }
    );
}

export function setPriceAlert(extraConfig, payload) {
    if(extraConfig && 'url' in extraConfig) {
        return axios.post(extraConfig.url,
        payload,
        {
            headers: extraConfig.headerConfig
        }
    );
    }

    return axios.post('uat0709/uat/brokerwl/set-broker-pricealert/',
        payload,
        {
            headers: {
                'requestCode': 'BrokerAASDK'
            }
        }
    );
}

export function deletePriceAlert(extraConfig, payload) {
    if(extraConfig && 'url' in extraConfig) {
        return axios.post(extraConfig.url,
        payload,
        {
            headers: extraConfig.headerConfig
        }
        );
    }

    return axios.post('uat0709/uat/brokerwl/delete-broker-pricealert/',
        payload,
        {
            headers: {
                'requestCode': 'BrokerAASDK'
            }
        }
    );
}

export function getTriggeredAlerts(extraConfig) {

    if(extraConfig && 'url' in extraConfig) {
        return axios.post(extraConfig.url,
        {
            clientCode: extraConfig.clientCode
        },
        {
            headers: extraConfig.headerConfig
        }
    );
    }

    return axios.post('uat0709/uat/brokerwl/get-broker-triggered-pricealert/',
        {
            clientCode: 'UATTEST'
        },
        {
            headers: {
                'requestCode': 'BrokerAASDK'
            }
        }
    );
}