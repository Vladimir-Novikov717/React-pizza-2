import React from "react";
import styles from "../components/NotFoundBlock/NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span className={styles.emoji}>😕</span>
        <br />
        Ничего не найдено
      </h1>
    </div>
  );
};

export default NotFoundBlock;