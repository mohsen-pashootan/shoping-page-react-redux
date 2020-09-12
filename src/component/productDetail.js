import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  detailAddedToCart,
  getDetailData,
} from "../stateManager/actionCreator";
import styles from "./productDetail.module.scss";

export default function ProductDetail({ match }) {
  const { selectedDetail } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailData(match.params.id));
  }, [dispatch, match.params.id]);

  function handleAddToCart() {
    dispatch(detailAddedToCart());
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["detail-container"]}>
        {selectedDetail.map((item) => (
          <React.Fragment key={item.id}>
            <div className={styles["image-container"]}>
              <img
                className={styles["detail-image"]}
                src={item.image.slice(1, 23)}
                alt={item.title}
              />
            </div>
            <div className={styles["detail-info"]}>
              <h1 className={styles["detail-title"]}>{item.title}</h1>
              <p className={styles["detail-desc"]}>{item.description}</p>
              <button
                className={styles["detail-add-btn"]}
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
