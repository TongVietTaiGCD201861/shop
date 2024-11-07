import axios from "axios";

// const BASEURL = "http://localhost:5000/api";
// const BASEURLIMAGE = "http://localhost:5000/api/images/";
const BASEURL = "https://localhost:7172/api";
const BASEURLIMAGE = "https://localhost:7172/api/images/";


export const Shirt = {
  get,
  post,
  put,
  getById,
  _delete,
  BASEURLIMAGE,
  uploadFile,
  getCountCart
};

export function get(token, params) {
  return axios.get(`${BASEURL}/Shirts/search`, {
    params: params,
    headers: { Authorization: "Bearer " + token }
  });
}


function post(data, token) {
  return axios.post(`${BASEURL}/Shirts`, data, {
    headers: { Authorization: "Bearer " + token },
  });
}

function uploadFile(id,data, token) {
  return axios.post(`${BASEURL}/Shirts/${id}/upload-image`, data, {
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

function getCountCart(id, token) {
  return axios.get(`${BASEURL}/Shirts/getCountCart/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}
