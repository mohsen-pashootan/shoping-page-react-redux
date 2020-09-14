export const INIT_STATE = {
  products: [],
  selectedItems: [],
  cartItems: null,
  sum: [],
  totalSum: null,
  selectedDetail: [],
  loading: false,
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
            description: item.fields.description,
          })
      );
      return {
        ...state,
        loading: false,
        products: newProducts,
      };

    case "PRODUCT_DETAIL_LOADED":
      const newProductDetail = new Product({
        id: action.payload.sys.id,
        title: action.payload.fields.title,
        url: action.payload.fields.image.fields.file.url,
        price: action.payload.fields.price,
        description: action.payload.fields.description,
      });
      const detail = [];
      detail.push(newProductDetail);
      return {
        ...state,
        loading: false,
        selectedDetail: detail,
      };

    case "LOADING":
      return {
        ...state,
        loading: true,
      };

    case "PRODUCT_ADDED_TO_CART":
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
      const newTotalSum = newSum
        .map((s) => s.price)
        .reduce((a, b) => a + b, 0)
        .toFixed(2);
      return {
        ...state,
        selectedItems: newSelectedArray,
        cartItems: state.cartItems + 1,
        sum: newSum,
        totalSum: newTotalSum,
      };

    case "DETAIL_ADDED_TO_CART":
      const proDetail = state.selectedDetail.find((item) => item);
      const detailindex = state.selectedItems.findIndex(
        (x) => x.id === proDetail.id
      );
      const detailSelectedArray = [...state.selectedItems];
      const detailSum = [...state.sum];
      if (detailindex === -1) {
        const newSelectedItem = {
          id: proDetail.id,
          title: proDetail.title,
          image: proDetail.image.slice(1, 23),
          price: proDetail.price,
          count: 1,
        };
        detailSelectedArray.push(newSelectedItem);
        detailSum.push({
          price: proDetail.price,
          id: proDetail.id,
        });
      } else {
        detailSelectedArray.splice(detailindex, 1, {
          ...state.selectedItems[detailindex],
          count: state.selectedItems[detailindex].count + 1,
        });
        const multipatePrice =
          detailSelectedArray[detailindex].price *
          detailSelectedArray[detailindex].count;
        const priceIndex = detailSum.findIndex((x) => x.id === proDetail.id);
        detailSum.splice(priceIndex, 1, {
          ...detailSum[priceIndex],
          price: multipatePrice,
        });
      }
      const detailTotalSum = detailSum
        .map((s) => s.price)
        .reduce((a, b) => a + b, 0)
        .toFixed(2);

      return {
        ...state,
        selectedItems: detailSelectedArray,
        cartItems: state.cartItems + 1,
        sum: detailSum,
        totalSum: detailTotalSum,
      };

    case "ITEM_DECREASED":
      const index2 = state.selectedItems.findIndex(
        (x) => x.id === action.payload
      );
      const newSelectedArray2 = [...state.selectedItems];
      const newSum2 = [...state.sum];

      if (state.selectedItems[index2].count === 1) {
        newSelectedArray2.splice(index2, 1);
        let priceIndex = null;
        priceIndex = newSum2.findIndex((x) => x.id === action.payload);
        newSum2.splice(priceIndex, 1);
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
      const decreasedTotalSum = newSum2
        .map((s) => s.price)
        .reduce((a, b) => a + b, 0)
        .toFixed(2);
      return {
        ...state,
        selectedItems: newSelectedArray2,
        cartItems: state.cartItems - 1,
        sum: newSum2,
        totalSum: decreasedTotalSum,
      };

    case "REMOVE_ITEM":
      const index3 = state.selectedItems.findIndex(
        (x) => x.id === action.payload
      );
      const newSelectedArray3 = [...state.selectedItems];
      const num = newSelectedArray3[index3].count;
      newSelectedArray3.splice(index3, 1);
      const sumToRemove = state.sum.filter(
        (item) => item.id !== action.payload
      );
      const removedTotalSum = sumToRemove
        .map((s) => s.price)
        .reduce((a, b) => a + b, 0);

      return {
        ...state,
        selectedItems: newSelectedArray3,
        cartItems: state.cartItems - num,
        sum: sumToRemove,
        totalSum: removedTotalSum,
      };

    case "CLEAR_CART":
      return {
        ...state,
        selectedItems: [],
        cartItems: null,
        sum: [],
        totalSum: null,
      };

    default:
      return state;
  }
}
