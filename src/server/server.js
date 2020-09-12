import Products from "../products.json";

const productItems = [...Products.items];

export function getProductItems() {
  return fakeApiCall(productItems);
}
export function getProductDetail(id) {
  return fakeApiCall(productItems).then((data) =>
    data.find((item) => item.sys.id === id)
  );
}

function fakeApiCall(values) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(values);
    }, 500);
  });
}
