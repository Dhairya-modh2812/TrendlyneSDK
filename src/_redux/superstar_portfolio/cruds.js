import axios from "axios";
import moment from "moment";

export function getTopInvester(extraConfig) {

  const { externalView, superstarIndexUrl, corsKey = '' } = extraConfig || {};

  if (externalView && superstarIndexUrl) {
    return axios.get(superstarIndexUrl, {
      headers: {
        KEY: corsKey
      },
      params: {
        segment: 'all'
      }
    })
  }

  return axios.get(
    `https://uat.trendlyne.com/clientapi/getSuperStarIndex/?segment=all`,

    {
      headers: {
        KEY: "f55e622f834aa7a66ec0dc0b7e5da99f280d6db8",

        requestCode: "Trendlyne",
      },
    },
    {
      params: {
        segment: "all",
      },
    }
  );
}

export function getOverviewDetails(id, extraConfig) {

  const { externalView, superstarPortfolioUrl, corsKey = '' } = extraConfig || {};

  if (externalView && superstarPortfolioUrl) {
    return axios.get(`${superstarPortfolioUrl}${id}/`, {
      headers: {
        KEY: corsKey
      },
      params: {
        QuarterString: "latest",
      },
    })
  }

  return axios.get(
    `https://uat.trendlyne.com/clientapi/superStarPortfolio/${id}/?QuarterString=latest`,

    {
      headers: {
        KEY: "f55e622f834aa7a66ec0dc0b7e5da99f280d6db8",
        requestCode: "Trendlyne",
      },
    },
    {
      params: {
        QuarterString: "latest",
      },
    }
  );
}
export function getBulkBlockDeals(id, extraConfig) {

  const { externalView, superstarBulkBlockDealsUrl, corsKey = '' } = extraConfig || {};

  if (externalView && superstarBulkBlockDealsUrl) {
    return axios.get(`${superstarBulkBlockDealsUrl}${id}/`, {
      headers: {
        KEY: corsKey
      },
    })
  }

  return axios.get(
    `https://uat.trendlyne.com/clientapi/superstar/bulk-block-deals/${id}/`,

    {
      headers: {
        KEY: "f55e622f834aa7a66ec0dc0b7e5da99f280d6db8",
        requestCode: "Trendlyne",
      },
    },
  
  );
}
export function getGroupBulkBlockDeals(extraConfig) {

  const { externalView, superstarGroupBulkBlockDealsUrl, corsKey = '' } = extraConfig || {};

  if (externalView && superstarGroupBulkBlockDealsUrl) {
    return axios.get(superstarGroupBulkBlockDealsUrl, {
      headers: {
        KEY: corsKey
      },
    })
  }

  return axios.get(
    `https://uat.trendlyne.com/clientapi/stock/bulk-block-deals-stock/v2/`,

    {
      headers: {
        KEY: "f55e622f834aa7a66ec0dc0b7e5da99f280d6db8",
        requestCode: "Trendlyne",
      },
    },
  
  );
}

export function getInsiderDetails(id, extraConfig) {

  const { externalView, superstarInsiderTradingSastUrl, corsKey = '' } = extraConfig || {};

  if (externalView && superstarInsiderTradingSastUrl) {
    return axios.get(`${superstarInsiderTradingSastUrl}${id}/`, {
      headers: {
        KEY: corsKey
      },
    })
  }

  return axios.get(
    `https://uat.trendlyne.com/clientapi/superstar/insider-trading-sast/${id}/`,

    {
      headers: {
        KEY: "f55e622f834aa7a66ec0dc0b7e5da99f280d6db8",
        requestCode: "Trendlyne",
      },
    },
  
  );
}
export function getGroupInsiderDetails(extraConfig) {
  
  const { externalView, superstarGroupInsiderTradingSastUrl, corsKey = '' } = extraConfig || {};

  if (externalView && superstarGroupInsiderTradingSastUrl) {
    return axios.get(`${superstarGroupInsiderTradingSastUrl}`, {
      headers: {
        KEY: corsKey
      },
    })
  }

  return axios.get(
    `https://uat.trendlyne.com/clientapi/stock/insider-trading-sast-stock/v2/`,

    {
      headers: {
        KEY: "f55e622f834aa7a66ec0dc0b7e5da99f280d6db8",
        requestCode: "Trendlyne",
      },
    },
  
  );
}
