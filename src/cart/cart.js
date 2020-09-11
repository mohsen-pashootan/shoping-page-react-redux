import React from "react";
import ReactDOM from "react-dom";
import styles from "../app.module.scss";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./cartItem";
import { clearCart } from "../stateManager/actionCreator";

export default function Cart({ toggle, onCloseCart }) {
  const { selectedItems, sum } = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }
  const newSum = sum.map((s) => s.price).reduce((a, b) => a + b, 0);
  console.log(newSum);
  return ReactDOM.createPortal(
    <div
      className={
        styles["cart-overlay"] + " " + (toggle && styles["transparentBcg"])
      }
    >
      <div className={styles["cart"] + " " + (toggle && styles["showCart"])}>
        <span className={styles["close-cart"]} onClick={onCloseCart}>
          <i className="fas fa-window-close"></i>
        </span>
        <h2>your cart</h2>
        <div className={styles["cart-content"]}>
          {selectedItems.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>
        <div className={styles["cart-footer"]}>
          <h3>
            your total : ${" "}
            <span className={styles["cart-total"]}>{newSum}</span>
          </h3>
          <button
            className={styles["clear-cart banner-btn"]}
            onClick={handleClearCart}
          >
            clear cart
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
