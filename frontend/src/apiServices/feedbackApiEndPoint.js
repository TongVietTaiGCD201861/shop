import axios from "axios";

const BASEURL = "http://localhost:5000/api";
// const BASEURL = "https://localhost:7172/api";


export const Feedback = {
  get,
  post,
  put,
  getById,
  _delete,
  updateStatus
};

function get(id, token) {
  return axios.get(`${BASEURL}/Feedbacks/search/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

function post(data, token) {
  return axios.post(`${BASEURL}/Feedbacks`, data, {
    headers: { Authorization: "Bearer " + token },
  });
}

function getById(id, token) {
  return axios.get(`${BASEURL}/Feedbacks/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

function updateStatus(id, status, token) {
  return axios.post(`${BASEURL}/Feedbacks/update/${id}/${status}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

function put(id, data, token) {
  return axios.put(`${BASEURL}/Feedbacks/${id}`, data, {
    headers: { Authorization: "Bearer " + token },
  });
}

function _delete(id, token) {
  return axios.delete(`${BASEURL}/Feedbacks/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}
