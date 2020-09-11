import React from "react";
import { useDispatch } from "react-redux";
import styles from "../app.module.scss";
import { selectedDetail } from "../stateManager/actionCreator";

export default function Item({ item, onItemClick }) {
  const dispatch = useDispatch();

  function handleSelectedDetail(item) {
    dispatch(selectedDetail(item));
  }
  return (
    <article className={styles["product"]}>
      <div className={styles["img-container"]}>
        <img
          className={styles["product-img"]}
          src={item.image}
          alt={item.title}
        />
        <button
          className={styles["bag-btn"]}
          onClick={() => onItemClick(item.id)}
        >
          <i className="fas fa-shopping-cart"></i>Add to cart
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>
      <h3 onClick={() => handleSelectedDetail(item)}>{item.title}</h3>
    </article>
  );
}
