import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

import {
  orderBy,
  getAllBreeds,
  orderNameAsc,
  orderNameDes,
  orderWeightMin,
  orderWeightMax,
  search,
  setState,
  getNames,
  getId,
  getTemperaments,
} from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

export default function Nav() {
  //traer los estados
  const order = useSelector((state) => state.order);
  const searchState = useSelector((state) => state.search);
  const state1 = useSelector((state) => state.breeds);
  const state2 = useSelector((state) => state.breedSearch);
  //nuevo estado para barra search
  const [searchReact, setSearchReact] = useState(null);

  const dispatch = useDispatch();
  // console.log("estado 2",state2);
  // console.log("estado 1",state1);
  

  //buscar por nombre id o temperamento
  useEffect(() => {
    if (searchState === "Name") {
      console.log(searchReact);
      const findName = state2.find((e) => e.name === searchReact);
      if (findName) {
        dispatch(getNames(searchReact));
      } else {
        dispatch(setState(state2));
      }
    } else if (searchState === "Id") {
      const findId = state2.find((e) => e.id == searchReact);
      if (findId) {
        dispatch(getId(searchReact));
      } else {
        dispatch(setState(state2));
      }
    } else if (searchState === "Temperament") {
      const filterTemp = state2.filter((e) => {
        if (e.temperament) {
          const temperaments = e.temperament.split(", ");
          return temperaments.includes(searchReact);
        }
      });
      if (filterTemp.length > 0) {
        dispatch(getTemperaments(searchReact));
      } else {
        dispatch(setState(state2));
      }
    }
  }, [searchReact]);

  //filtrar por nombre o peso
  const handleSelect = (e) => {
    dispatch(orderBy(e.target.value));

    if (e.target.value === "None") {
      dispatch(getAllBreeds(order));
    } else if (e.target.value === "Name - ↓") {
      dispatch(orderNameAsc());
    } else if (e.target.value === "Name - ↑") {
      dispatch(orderNameDes());
    } else if (e.target.value === "Weight min - ↑") {
      dispatch(orderWeightMin());
    } else if (e.target.value === "Weight max - ↓") {
      dispatch(orderWeightMax());
    }
  };
  //handler estado search
  const handleSearch = (e) => {
    dispatch(search(e.target.value));
  };
  //handler estado searchReact
  const handleSearchBar = (e) => {
    setSearchReact(e.target.value);
  };

  return (
    <div className={styles.container} id={styles.container2}>
      {/* // -----------acerca---------------- */}
      <div className={styles.about}>
        <NavLink id={styles.navlink} to={`/about`}>
          <div class={styles.glitch} data-glitch="ABOUT">
            ABOUT
          </div>
        </NavLink>
      </div>
      {/* // -----------crear---------------- */}
      <div className={styles.create}>
        <NavLink id={styles.navlink2} to={`/create`}>
          <div class={styles.glitch} data-glitch="CREATE">
            CREATE
          </div>
        </NavLink>
      </div>
      {/* // -----------logo---------------- */}
      <div className={styles.navLogo}>
        <NavLink to={`/`}>
          <button className={styles.glowingbtn}>
            <span className={styles.glowingtxt}>
              P<span className={styles.faultyletter}>I</span> DOGS
            </span>
          </button>
        </NavLink>
      </div>

      {/* // -----------filtrar---------------- */}
      <div className={styles.orderby}>
        <div class={styles.glitch2} data-glitch="ORDER BY:">
          ORDER BY:
        </div>
        <select name="select" className={styles.select} onChange={handleSelect}>
          <option value="None">None</option>
          <option value="Name - ↑">Name - ↑</option>
          <option value="Name - ↓">Name - ↓</option>
          <option value="Weight min - ↑">Weight min - ↑</option>
          <option value="Weight max - ↓">Weight max - ↓</option>
        </select>
      </div>
      {/* // -----------busqueda---------------- */}
      <div className={styles.orderby}>
        <div class={styles.glitch2} data-glitch="SEARCH BY:">
          SEARCH BY:
        </div>

        <input
          className={styles.select2}
          type={searchState === "Id" ? "number" : "search"}
          placeholder={
            searchState === "Id"
              ? "3"
              : searchState === "Temperament"
              ? "Docile"
              : "Akita"
          }
          value={searchReact}
          onChange={handleSearchBar}
        />

        <select name="select" className={styles.select} onChange={handleSearch}>
          <option value="Name">Name</option>
          <option value="Temperament">Temperament</option>
        </select>
      </div>
    </div>
  );
}
