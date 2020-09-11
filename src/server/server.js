import Products from "../products.json";

const productItems = [...Products.items];

export function getProductItems() {
  return fakeApiCall(productItems);
}

function fakeApiCall(values) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(values);
    }, 500);
  });
}

// class Products {
//     constructor(id,title,url,price,description) {
//       this.id = id ;
//       this.title = title ;
//       this.image = url;
//       this.price=price;
//       this.description=description;
//     }
//   }

// function mapper(){
// arr.map(item =>  )
//     return

// }
