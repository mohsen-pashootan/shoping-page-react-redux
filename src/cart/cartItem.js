import React from "react";
import styles from "../app.module.scss";
import { useDispatch } from "react-redux";
import {
  itemIncreased,
  itemDecreased,
  removeItem,
} from "./../stateManager/actionCreator";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  function handleIncrease(id) {
    dispatch(itemIncreased(id));
  }
  function handleDecrease(id) {
    dispatch(itemDecreased(id));
  }

  function handleRemoveItem(id) {
    dispatch(removeItem(id));
  }
  const { image, title, price, count, id } = item;
  return (
    <div className={styles["cart-item"]}>
      <img src={image} alt={title} />
      <div>
        <h4>{title}</h4>
        <h5>{price}</h5>
        <span
          className={styles["remove-item"]}
          onClick={() => handleRemoveItem(id)}
        >
          remove
        </span>
      </div>
      <div>
        <i className="fas fa-chevron-up" onClick={() => handleIncrease(id)}></i>
        <p className={styles["item-amount"]}>{count}</p>
        <i
          className="fas fa-chevron-down"
          onClick={() => handleDecrease(id)}
        ></i>
      </div>
    </div>
  );
}
