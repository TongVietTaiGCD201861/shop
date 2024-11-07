import axios from "axios";

// const BASEURL = "http://localhost:5000/api";
const BASEURL = "https://localhost:7172/api";


export const PurchaseProduct = {
  get,
  post,
  put,
  getById,
  _delete,
  updateStatus,
  getOrder
};

function get(token) {
  return axios.get(`${BASEURL}/Purchases`, {
    headers: { Authorization: "Bearer " + token },
  });
}

function getOrder(token, searchOrder) {
  return axios.get(`${BASEURL}/Purchases/search`, {
    params: {
      searchOrder: searchOrder
    },
    headers: { Authorization: "Bearer " + token }
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

function updateStatus(id, status, token) {
  return axios.post(`${BASEURL}/Purchases/update/${id}/${status}`, {
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
