import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination(props) {
  //importacion de estados
  const { bread, itemsPerPage, setCurrentPage, currentPage } = props;
  //numero de paginas
  const totalPages = Math.ceil(bread.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  //setear numero de pagina
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  //funcion para renderizar cantidad de botones
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button
        key={number}
        id={number}
        onClick={handleClick}
        className={`${styles.button} ${
          currentPage === number ? styles.active : ""
        }`}
      >
        {number}
      </button>
    );
  });

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
        {renderPageNumbers}
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
