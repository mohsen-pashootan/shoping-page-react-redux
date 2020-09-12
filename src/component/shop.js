import React from "react";
import styles from "./shop.module.scss";
import { useSelector } from "react-redux";
import Products from "./products";

export default function Shop() {
  const { products } = useSelector((state) => state);

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
        <div className={styles["products-center"]}>
          {products.map((item) => (
            <Products item={item} key={item.id} />
          ))}
        </div>
      </section>
    </>
  );
}
