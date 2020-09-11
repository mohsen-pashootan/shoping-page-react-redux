import { getProductItems } from "../server/server";

function actionCreator(type, payload) {
  return {
    type,
    payload,
  };
}

export function getInitData() {
  return function (dispatch) {
    getProductItems().then((data) =>
      dispatch({ type: "DATA_LOADED", payload: data })
    );
  };
}

export const itemClicked = (id) => actionCreator("ITEM_CLICKED", id);
export const itemIncreased = (id) => actionCreator("ITEM_CLICKED", id);
export const itemDecreased = (id) => actionCreator("ITEM_DECREASED", id);
export const removeItem = (id) => actionCreator("REMOVE_ITEM", id);
export const clearCart = () => actionCreator("CLEAR_CART");
export const selectedDetail = (item) => actionCreator("SELECTED_DETAIL", item);
