import React, { useState } from "react";
import styles from "./Pagination.module.css";

export default function Pagination(props) {
  //importacion de estados
  const { breed, itemsPerPage, setCurrentPage, currentPage } = props;
  //numero de paginas
  const totalPages = Math.ceil(breed.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  //estado cantidad de botones a mostrar
  const [displayPages, setDisplayPages] = useState(6);
  //setear numero de pagina
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  //setear estado cantidad de  botones a mostrar
  const handleNext = () => {
    setDisplayPages((prev) => prev + 6);
  };

  const handlePrev = () => {
    setDisplayPages((prev) => prev - 6);
  };
//funcion para renderizar cantidad de botones mediante un slice del estado(6) y seguido de un mapeo de los botones
  const renderPageNumbers = pageNumbers
    .slice(displayPages - 6, displayPages)
    .map((number) => {
      return (
        <button
          key={number}
          id={number}
          onClick={handleClick}
          value={currentPage}
          className={`${styles.button} ${
            currentPage === number ? styles.active : ""
          }`}
        >
          {number}
        </button>
      );
    });
//renderizar todo el componente
  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <button
          onClick={() =>
            setCurrentPage((prev) => {
              if (prev > 1) {
                return prev - 1;
              } else {
                return prev;
              }
            })
          }
          className={styles.prev}
        >
          Prev
        </button>
        {displayPages > 6 && (
          <button onClick={handlePrev} className={styles.prev}>
            {"<<"}
          </button>
        )}
        {/* renderizar numero de botones */}
        {renderPageNumbers}
        
        {totalPages > displayPages && (
          <button onClick={handleNext} className={styles.next}>
            {">>"}
          </button>
        )}
        <button
          onClick={() =>
            setCurrentPage((prev) => {
              if (prev < totalPages) {
                return prev + 1;
              } else {
                return prev;
              }
            })
          }
          className={styles.next}
        >
          Next
        </button>
      </div>
    </div>
  );
}
