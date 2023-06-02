import axios from "axios";

export function getComparison(stock_1, stock_2) {
    return axios.post('mapp/v1/stock/XYcomparison/',
        {
            "stock_list": [stock_1, stock_2]
        },
        {
            headers: {
                'requestCode': 'BrokerAASDK'
            }
        }
    );
}

export function searchStock(keyword) {
    return axios.get(`equity/api/ac_snames/price/?term=${keyword}`,
        {
            headers: {
                'requestCode': 'BrokerAASDK'
            }
        }
    );
}