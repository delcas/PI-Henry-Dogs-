import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./LandingPage.module.css";


export default function LandingPage() {
  return (
    <div className={styles.background}>
      <div id={styles.div}>
        <NavLink to={`/home`}>
          <button className={styles.glowingbtn}>
            <span className={styles.glowingtxt}>
              P<span className={styles.faultyletter}>I</span> DOGS
            </span>
          </button>
        </NavLink>

      </div>
    </div>
  );
}
