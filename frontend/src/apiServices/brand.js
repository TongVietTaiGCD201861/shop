import axios from "axios";

const BASEURL = "https://localhost:7172/api";


export const Brand = {
  get,
  getByBrandId,
  deleteBrand,
  createBrand,
  updateBrand,
  updateStatus
};

export function get(token, params) {
  return axios.get(`${BASEURL}/Brands/getAllBrands`, {
    params: params,
    headers: { Authorization: "Bearer " + token }
  });
}

export function getByBrandId(token, id) {
  return axios.get(`${BASEURL}/Brands/getByBrandId/${id}`, {
    headers: { Authorization: "Bearer " + token }
  });
}

export function deleteBrand(token, id) {
  return axios.delete(`${BASEURL}/Brands/${id}`, {
    headers: { Authorization: "Bearer " + token }
  });
}


function createBrand(token, data) {
  return axios.post(`${BASEURL}/Brands/createBrand`, data, {
    headers: { Authorization: "Bearer " + token },
  });
}

function updateBrand(token, id, data) {
  return axios.put(`${BASEURL}/Brands/updateBrand/${id}`, data, {
    headers: { Authorization: "Bearer " + token },
  });
}

function updateStatus(token, id, operatingStatus) {
  return axios.put(`${BASEURL}/Brands/updateStatus/${id}/${operatingStatus}`, {
    headers: { Authorization: "Bearer " + token },
  });
}