import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Init.module.css";
import gif_load from "../../img/480.gif";


export default function Init(props) {
  return (
    <div id={styles.div}>
      <NavLink to={`/home`}>
        <button className={styles.glowingbtn}>
          <span className={styles.glowingtxt}>
            D<span className={styles.faultyletter}>OG</span> BREEDS
          </span>
        </button>
      </NavLink>
      <br/>
      <img className={styles.load} src={gif_load} alt="dog loading" />
    </div>
  );
}
