export const INIT_STATE = {
  products: [],
  selectedItems: [],
  cartItems: null,
  sum: [],
  selectedDetail: [],
};

class Product {
  constructor({ id, title, url, price, description }) {
    this.id = id;
    this.title = title;
    this.image = `${url}`;
    this.price = price;
    this.description = description;
  }
}

export default function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "DATA_LOADED":
      const newProducts = action.payload.map(
        (item) =>
          new Product({
            id: item.sys.id,
            title: item.fields.title,
            url: item.fields.image.fields.file.url,
            price: item.fields.price,
            description:
              "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
          })
      );
      console.log(newProducts);
      return {
        ...state,
        products: newProducts,
      };

    case "ITEM_CLICKED":
      const exist = state.products.find((item) => item.id === action.payload);
      const index = state.selectedItems.findIndex((x) => x.id === exist.id);
      const newSelectedArray = [...state.selectedItems];
      const newSum = [...state.sum];
      if (index === -1) {
        const newSelectedItem = {
          id: exist.id,
          title: exist.title,
          image: exist.image,
          price: exist.price,
          count: 1,
        };
        newSelectedArray.push(newSelectedItem);
        newSum.push({ price: exist.price, id: exist.id });
      } else {
        newSelectedArray.splice(index, 1, {
          ...state.selectedItems[index],
          count: state.selectedItems[index].count + 1,
        });
        const multipatePrice =
          newSelectedArray[index].price * newSelectedArray[index].count;
        const priceIndex = newSum.findIndex((x) => x.id === action.payload);
        newSum.splice(priceIndex, 1, {
          ...newSum[priceIndex],
          price: multipatePrice,
        });
      }
      console.log("newsum: ", newSum);
      console.log("sum: ", state.sum);
      return {
        ...state,
        selectedItems: newSelectedArray,
        cartItems: state.cartItems + 1,
        sum: newSum,
      };

    case "ITEM_DECREASED":
      const index2 = state.selectedItems.findIndex(
        (x) => x.id === action.payload
      );
      const newSelectedArray2 = [...state.selectedItems];
      const newSum2 = [...state.sum];

      if (state.selectedItems[index2].count === 0) {
        newSelectedArray2.splice(index2, 1);
      } else {
        newSelectedArray2.splice(index2, 1, {
          ...state.selectedItems[index2],
          count: state.selectedItems[index2].count - 1,
        });
        const multipatePrice =
          newSelectedArray2[index2].price * newSelectedArray2[index2].count;
        const priceIndex = newSum2.findIndex((x) => x.id === action.payload);
        newSum2.splice(priceIndex, 1, {
          ...newSum2[priceIndex],
          price: multipatePrice,
        });
      }
      return {
        ...state,
        selectedItems: newSelectedArray2,
        cartItems: state.cartItems - 1,
        sum: newSum2,
      };

    case "REMOVE_ITEM":
      const index3 = state.selectedItems.findIndex(
        (x) => x.id === action.payload
      );
      const newSelectedArray3 = [...state.selectedItems];
      const num = newSelectedArray3[index3].count;
      newSelectedArray3.splice(index3, 1);

      return {
        ...state,
        selectedItems: newSelectedArray3,
        cartItems: state.cartItems - num,
      };

    case "CLEAR_CART":
      return {
        ...state,
        selectedItems: [],
        cartItems: null,
      };

    case "SELECTED_DETAIL":
      const detail = [];
      detail.push(action.payload);
      return {
        ...state,
        selectedDetail: detail,
      };

    default:
      return state;
  }
}
