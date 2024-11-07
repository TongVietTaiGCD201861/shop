import axios from "axios";

// const BASEURL = "http://localhost:5000/api";
// const BASEURLIMAGE = "http://localhost:5000/api/images/";
const BASEURL = "https://localhost:7172/api";
const BASEURLIMAGE = "https://localhost:7172/api/images/";


export const Discount = {
  get,
};

export function get(token) {
  return axios.get(`${BASEURL}/Discounts/getAllDiscount`, {
    headers: { Authorization: "Bearer " + token }
  });
}