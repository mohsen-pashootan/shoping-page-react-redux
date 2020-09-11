import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemClicked } from "../stateManager/actionCreator";
import styles from "./itemDetail.module.scss";

export default function ItemDetail() {
  const { selectedDetail } = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleAddToCart(id) {
    dispatch(itemClicked(id));
  }
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={styles["detail-container"]}>
        {selectedDetail.map((item) => (
          <React.Fragment key={item.id}>
            <div className={styles["image-container"]}>
              <img
                className={styles["detail-image"]}
                src={item.image}
                alt={item.title}
              />
            </div>
            <div className={styles["detail-info"]}>
              <h1 className={styles["detail-title"]}>{item.title}</h1>
              <p>{item.description}</p>
              <button onClick={() => handleAddToCart(item.id)}>
                Add to cart
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
