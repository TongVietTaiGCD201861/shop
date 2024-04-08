export const AddToCart = (products) => {
  return {
    type: "ADD_TO_CART",
    payload: products,
  };
};

export const deleteCart = (id) => {
  return {
    type: "DELETE_CART",
    payload: id,
  };
};

export const searchCart = (name) => {
  return {
    type: "SEARCH_CART",
    payload: name,
  };
};

export const searchCartStart = (name) => {
  return {
    type: "SEARCH_CART_START",
    payload: name,
  };
};

export const productCheck = (cartIds) => {
  return {
    type: "PRODUCT_CHECK",
    payload: cartIds,
  };
};

