import axios from "axios";
import moment from "moment";

export function getIpoCompanyDetail(id) {
  return axios.get(
    `ipo/api/company-details/${id}/`,
  );
}

export function getIpoList() {
  return axios.get(
    `ipo/api/listing-details/`,
  );
}

export function getSearch(value) {
  return axios.get(
    `ipo/api/search/?search_text=${value}`,
  );
}

export function getRecent() {
  return axios.get(
    `ipo/api/screener/`,
  );
}

export function getRecentIpoByFilter(filterType) {
  if(!filterType) {
      return;
  }
  return axios.get(
    `ipo/api/screener/${filterType}/`,
  );
}

export function getRecentMost(pagenumber, pageSize) {
  return axios.get(
    `ipo/api/screener/most-successful/`,
  );
}

export function getRecentLeast(pagenumber, pageSize) {
  return axios.get(
    `ipo/api/screener/least-successful/`,
  );
}

export function getRecentYear(pagenumber, pageSize, year) {
  return axios.get(
    `ipo/api/screener/year/${year}/`,
  );
}

export function getUpcomingList() {
  return axios.get(
    `ipo/api/upcoming/`,
  );
}
