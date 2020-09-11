import React from "react";
import styles from "../app.module.scss";
import Item from "./item";
import { useSelector, useDispatch } from "react-redux";
import { itemClicked } from "../stateManager/actionCreator";
import ItemDetail from "./itemDetail";

export default function ShopItems() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleItemClick(id) {
    dispatch(itemClicked(id));
  }

  return (
    <>
      <header className={styles["hero"]}>
        <div className={styles["banner"]}>
          <h1 className={styles["banner-title"]}>FURNITURE COLLECTION</h1>
          <button className={styles["banner-btn"]}>shop now</button>
        </div>
      </header>
      <section className={styles["products"]}>
        <div className={styles["section-title"]}>
          <h2>our products</h2>
        </div>
      </section>
      <div className={styles["products-center"]}>
        {state.products.map((item) => (
          <Item item={item} key={item.id} onItemClick={handleItemClick} />
        ))}
        {/* <br />
        <ItemDetail /> */}
      </div>
    </>
  );
}
