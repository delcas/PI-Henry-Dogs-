import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./About.module.css";
import linkedin from "../../img/linkedin.png";
import github from "../../img/github.png";

export default function About() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2>ABOUT THIS PI-DOGS APP</h2>
          </div>

          <div className={styles.content}>
            <p className={styles.size}>
              This APP was developed by Gabriel del Castillo, for Henry's
              individual project. It is made up of a REST API with a database
              developed in SQL using Sequelize connected to PostgreSQL and the
              server developed in Express JS. For the Front end, the React
              framework was used, together with Redux and React-Rredux, the
              styles are pure CSS code, the API requests are made through Axios,
              I hope you enjoy it. Contact me and follow me on Github and Linkedin
            </p>
            <div className={styles.logosLinks}>
              <div>
                <NavLink
                  to={`https://www.linkedin.com/in/gabriel-del-castillo-541b181bb/` } target="_blank"
                >
                  <img className={styles.img} src={linkedin} alt="linkedin" />
                </NavLink>
              </div>
              <div>
                <NavLink to={`https://github.com/delcas`} target="_blank">
                  <img className={styles.img} src={github} alt="github" />
                </NavLink>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <NavLink className={styles.NavLink} to={`/home`}>
              Back to Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
