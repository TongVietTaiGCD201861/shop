import axios from "axios";

// const BASEURL = "http://localhost:5000/api";
// const BASEURLIMAGE = "http://localhost:5000/api/images/";
const BASEURL = "https://localhost:7172/api";


export const Discount = {
  get,
  getByCode,
  getById,
  createDiscount,
  updateDiscount,
  deleteDiscount,
};

export function get(token, params) {
  return axios.get(`${BASEURL}/Discounts/getAllDiscount`, {
    params: params,
    headers: { Authorization: "Bearer " + token }
  });
}

export function getByCode(token, code) {
  return axios.get(`${BASEURL}/Discounts/code/${code}`, {
    headers: { Authorization: "Bearer " + token }
  });
}

export function getById(token, id) {
  return axios.get(`${BASEURL}/Discounts/${id}`, {
    headers: { Authorization: "Bearer " + token }
  });
}

export function createDiscount(token, data) {
  return axios.post(`${BASEURL}/Discounts/add`, data, {
    headers: { Authorization: "Bearer " + token },
  });
}

export function updateDiscount(token, data) {
  return axios.post(`${BASEURL}/Discounts/update`, data, {
    headers: { Authorization: "Bearer " + token },
  });
}

export function deleteDiscount(token, id) {
  return axios.post(`${BASEURL}/Discounts/delete/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}