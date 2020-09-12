import { getProductDetail, getProductItems } from "../server/server";

function actionCreator(type, payload) {
  return {
    type,
    payload,
  };
}

export function getInitData() {
  return function (dispatch) {
    dispatch(actionCreator("LOADING"));
    getProductItems().then((products) =>
      dispatch({ type: "DATA_LOADED", payload: products })
    );
  };
}

export function getDetailData(id) {
  return function (dispatch) {
    dispatch(actionCreator("LOADING"));
    getProductDetail(id).then((detail) =>
      dispatch(actionCreator("PRODUCT_DETAIL_LOADED", detail))
    );
  };
}

export const productAddedToCart = (id) =>
  actionCreator("PRODUCT_ADDED_TO_CART", id);
export const detailAddedToCart = () => actionCreator("DETAIL_ADDED_TO_CART");
export const itemIncreased = (id) => actionCreator("PRODUCT_ADDED_TO_CART", id);
export const itemDecreased = (id) => actionCreator("ITEM_DECREASED", id);
export const removeItem = (id) => actionCreator("REMOVE_ITEM", id);
export const clearCart = () => actionCreator("CLEAR_CART");
export const selectedDetail = (id) => actionCreator("SELECTED_DETAIL", id);
