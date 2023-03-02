import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {getAllBreeds} from "../../redux/actions"
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Breed.module.css";

export default function Home(props) {
  //destructuring de Props 
  const { id, name, image, temperament, weight_min, weight_max } = props;

  return (
    <div className={styles.container} key={id}>
      <div className={styles.card} key={name}>
        <div className={styles.img}>
          <img className={styles.image} src={image} alt={name} />
        </div>

        <div className={styles.content}>
          <NavLink className={styles.NavLink} to={`/breed/${id}`}>
            {name}
          </NavLink>

          <div className={styles.size}>
            <h3>
              <b>Weight (pounds):</b>
              <br />
              Min. {weight_min !== "NaN" ? weight_min : "___"} - Max.{" "}
              {weight_max !== "NaN" ? weight_max : "___"}
            </h3>
          </div>

          <div className={styles.temperaments}>
            <h3>
              <b>Temperaments:</b>
              <br />
              {temperament}
            </h3>
          </div>

          <NavLink to={`/breed/${id}`}>
            Id: {id}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
