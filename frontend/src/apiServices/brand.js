import axios from "axios";

const BASEURL = "https://localhost:7172/api";


export const Brand = {
  get,
  getByBrandId
};

export function get(token) {
  return axios.get(`${BASEURL}/Brands/getAllBrands`, {
    headers: { Authorization: "Bearer " + token }
  });
}

export function getByBrandId(token, id) {
  return axios.get(`${BASEURL}/Brands/getByBrandId/${id}`, {
    headers: { Authorization: "Bearer " + token }
  });
}