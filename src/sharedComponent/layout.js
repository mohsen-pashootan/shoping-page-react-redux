import React, { useState } from "react";
import styles from "../app.module.scss";
import Cart from "../cart/cart";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const [toggle, setToggle] = useState(false);
  const { cartItems } = useSelector((state) => state);

  function handleCartOpen() {
    setToggle(true);
  }

  function handleCartClose() {
    setToggle(false);
  }
  return (
    <>
      <Cart toggle={toggle} onCloseCart={handleCartClose} />
      <nav className={styles["navbar"]}>
        <div className={styles["navbar-center"]}>
          <span className={styles["nav-icon"]}>
            <i className="fas fa-bars"></i>
          </span>
          <img src="./images/logo.svg" alt="Comphy house"></img>
          <div className={styles["cart-btn"]}>
            <span className={styles["nav-icon"]} onClick={handleCartOpen}>
              <i className="fas fa-cart-plus"></i>
            </span>
            <div className={styles["cart-items"]}>{cartItems}</div>
          </div>
        </div>
      </nav>
      <div>{children}</div>
    </>
  );
}
