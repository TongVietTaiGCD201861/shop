import axios from "axios";

// const BASEURL = "http://localhost:5000/api";
const BASEURL = "https://localhost:7172/api";


export const PaypalApi = {
  get,
};

export function get() {
    return axios.get(`${BASEURL}/Checkout/getIndex`
    //     , {
        //   headers: { Authorization: "Bearer " + token }
        // }
    );
  }