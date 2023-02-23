import React from "react";
import styles from "./NotFound.module.css";
import img from "../../img/dog_dead.png"

export default function NotFound(props) {
  const {error}=props
  return (
    <div className={styles.error}>
      <img className={styles.img} src={img} alt="dog dead"/>
      <h1 > error 404 - NOT FOUND</h1>
      <h2>{error}</h2>
    </div>
  );
}
