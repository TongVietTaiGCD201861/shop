import axios from "axios";

const BASEURL = "http://localhost:5000/api";


export const PurchaseProduct = {
  get,
  post,
  put,
  getById,
  _delete,
};

function get(token) {
  return axios.get(`${BASEURL}/Purchases`, {
      headers: { Authorization: "Bearer " + token },
    });
}

function post(data, token) {
  return axios.post(`${BASEURL}/Purchases`, data, {
    headers: { Authorization: "Bearer " + token },
  });
}

function getById(id, token) {
  return axios.get(`${BASEURL}/Purchases/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

function put(id, data, token) {
  return axios.put(`${BASEURL}/Purchases/${id}`, data, {
    headers: { Authorization: "Bearer " + token },
  });
}

function _delete(id, token) {
  return axios.delete(`${BASEURL}/Purchases/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}