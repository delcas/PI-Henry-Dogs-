import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Id.module.css";
import NotFound from "../NotFound/NotFound";
import Loading from "../Loading/Loading";

export default function Id() {
  const { id } = useParams();
  const [dog, setDog] = useState();
  const [error,setError] = useState()
  const [loading, setLoading]=useState(true)

  useEffect(() => {
    axios
      .get (`http://localhost:3001/dogs/${id}`)
      .then((response) => {
        setDog(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.err);
        setLoading(false)
      });
  }, [id]);

  return <div> {loading ? (
    <div>
      <Loading/>
    </div>
  ) : dog ? (
    <div className={styles.container} key={dog.id}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>{dog.name}</h2>
        </div>

        <div className={styles.sidebar}>
          <img className={styles.image} src={dog.image} alt={dog.name} />
        </div>

        <div className={styles.content}>
          <div className={styles.size}>
            <h3>
              <b>Life:</b>
              <br /> {dog.life}
            </h3>
            <h3>
              <b>Weight (pounds):</b>
              <br />
              Min. {dog.weight_min !== "NaN" ? dog.weight_min : "___"}p - Max{" "}
              {dog.weight_max !== "NaN" ? dog.weight_max : "___"}p
            </h3>
            <h3>
              <b>Tall (centimeters):</b>
              <br />
              Min. {dog.height_min ? dog.height_min : "--"}cm - Max. {dog.height_max ? dog.height_max : "--"}cm
            </h3>
          </div>

          <div className={styles.temperaments}>
            <h3>
              <b>Temperaments:</b>
              <br />
              {dog.temperament}
            </h3>
          </div>
          <h3 className={styles.id}>
            <a>Id: {dog.id}</a>
          </h3>
        </div>
        <div className={styles.footer}>
          <NavLink className={styles.NavLink} to={`/home`}>
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
   ) : (
    <NotFound error={error}/>
   )} </div>;
}
