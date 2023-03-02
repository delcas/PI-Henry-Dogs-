import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllBreeds } from "../../redux/actions";

import React, { useState, useEffect } from "react";
import Breed from "../Breed/Breed";
import styles from "./Breeds.module.css";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import Nav from "../Nav/Nav";
export default function Home() {
  // estados de razas y paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  // traer el esstado de redux
  let breeds = useSelector((state) => state.breeds);
  const load = useSelector((state) => state.loading);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

  //traer la data al estado de redux
  useEffect(() => {
    dispatch(getAllBreeds(order));
  }, []);
  //filtrar la data del estado



  // constantes para paginacion
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = breeds.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {load ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div key="breeds">
          <div key="nav">
            <Nav />
          </div>
          <div className={styles.container} key="all dogs">
            {currentItems.map((dog) => (
              <Breed
                key={dog.id}
                id={dog.id}
                name={dog.name}
                image={dog.image}
                temperament={dog.temperament}
                weight_min={dog.weight_min}
                weight_max={dog.weight_max}
              />
            ))}
          </div>
          <div className={styles.pagination} key="pagination">
            <Pagination
              breed={breeds}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
