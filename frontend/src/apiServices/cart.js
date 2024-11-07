import axios from "axios";

const BASEURL = "https://localhost:7172/api";


export const Cart = {
    addItemToCart
};

export function addItemToCart(token, userId, item) {
    return axios.post(`${BASEURL}/Carts/${userId}/items`, item, {
        headers: { Authorization: "Bearer " + token }
    });
}
