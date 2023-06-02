import axios from "axios";

export function getTriggeredAlphaAlerts() {
    return axios.post('uat0709/uat/brokerwl/get-broker-triggered-alphalert/',
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

export function getAlphaAlertConfigurations() {
    return axios.post('uat0709/uat/brokerwl/get-broker-initial-configuration/',
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

export function addAlphaAlert(screen_pk, selected_watch_list) {
    return axios.post('uat0709/uat/brokerwl/add-broker-alphalert/',
        {
            'clientCode': 'UATTEST',
            'watchlistPk': selected_watch_list,
            'postdata': {
                'screen_pk': screen_pk
            }
        },
        {
            headers: {
                'requestCode': 'BrokerAASDK'
            }
        }
    );
}

export function deleteAlphaAlert(screen_pk, selected_watch_list) {
    return axios.post('uat0709/uat/brokerwl/delete-broker-alphalert/',
        {
            'clientCode': 'UATTEST',
            'watchlistPk': selected_watch_list,
            'postdata': {
                'screen_pk': screen_pk
            }
        },
        {
            headers: {
                'requestCode': 'BrokerAASDK'
            }
        }
    );
}