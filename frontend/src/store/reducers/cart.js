const initState = {
  productSearch: [],
  products: localStorage.getItem("newItem") ? localStorage.getItem("newItem") : [],
  productChecked: []
}

const cartReducer = (state = initState, { payload, type }) => {
  switch (type) {
    case "ADD_TO_CART":
      state.products.push(payload)
      localStorage.setItem("newItem", JSON.stringify(state.products))
      return { ...state }
    case "DELETE_CART":
      state.products = deleteCart(state.products, payload)
      localStorage.setItem("newItem", JSON.stringify(state.products))
      return { ...state }
    case "SEARCH_CART":
      state.productSearch = searchCart(state.products, payload)
      return { ...state }
    case "SEARCH_CART_START":
      state.productSearch = []
      return { ...state }
    case "PRODUCT_CHECK":
      state.productChecked = productCheck(state.products, payload)
      return { ...state }
    case "PRODUCT_CHECK_FILTER":
      state.productChecked = productCkeckFilter(state.products, payload)
      return { ...state }
    default:
      return state;
  }
};

const deleteCart = (products, cartId) => {
  return products.filter(p => p.cartId != cartId);
};

const productCheck = (products, listId) => {
  return products.filter(p => listId.includes(p.cartId));
};


const searchCart = (products, name) => {
  return products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
};

export default cartReducer;
