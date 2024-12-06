import axios from "axios";

const BASEURL = "https://localhost:7172/api";


export const CartApi = {
    addItemToCart,
    getCartByUserId,
    deleteItemFromCart,
    updateCart
};

export function addItemToCart(token, userId, item) {
    return axios.post(`${BASEURL}/Carts/${userId}/items`, item, {
        headers: { Authorization: "Bearer " + token }
    });
}

export function getCartByUserId(token, userId) {
    return axios.get(`${BASEURL}/Carts/${userId}`, {
        headers: { Authorization: "Bearer " + token }
    });
}
export function deleteItemFromCart(token, userId, shirtId) {
    return axios.delete(`${BASEURL}/Carts/delete/${userId}/items/${shirtId}`, {
        headers: { Authorization: "Bearer " + token }
    });
}

export function updateCart(token, CartId, item) {
    return axios.put(`${BASEURL}/Carts/update-quantity/${CartId}/${item}`, {
        headers: { Authorization: "Bearer " + token }
    });
}
