import React, { useState, useEffect } from "react";
import Breed from "../Breed/Breed";
import axios from "axios";
import styles from "./Breeds.module.css";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";

export default function Home() {
  // estados de razas y paginacion
  const [breed, setBreed] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/dogs`)
      .then((response) => {
        setBreed(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.response.data.error);
        setLoading(false);
      });
  }, []);

  // constantes para paginacion
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = breed.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {loading ? (
        <div >
          <Loading/>
        </div>
      ) : (
        <div>
      <div className={styles.container} key="all dogs" >
        {currentItems.map((dog) => (
          <Breed
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
          breed={breed}
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
