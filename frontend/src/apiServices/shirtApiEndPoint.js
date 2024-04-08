import axios from "axios";

const BASEURL = "http://localhost:5000/api";
const BASEURLIMAGE = "http://localhost:5000/api/images/";


export const Shirt = {
  get,
  post,
  put,
  getById,
  _delete,
  BASEURLIMAGE,
};

function get(token) {
  return axios.get(`${BASEURL}/Shirts`, {
      headers: { Authorization: "Bearer " + token },
    });
}

function post(data, token) {
  return axios.post(`${BASEURL}/Shirts`, data, {
    headers: { Authorization: "Bearer " + token },
  });
}

function getById(id, token) {
  return axios.get(`${BASEURL}/Shirts/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

function put(id, data, token) {
  return axios.put(`${BASEURL}/Shirts/${id}`, data, {
    headers: { Authorization: "Bearer " + token },
  });
}

function _delete(id, token) {
  return axios.delete(`${BASEURL}/Shirts/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}
