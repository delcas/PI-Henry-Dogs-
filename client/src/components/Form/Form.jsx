import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import styles from "./Form.module.css";
import { validation } from "./validation";

export default function Form() {
  const URL = "http://localhost:3001/";
  const [temperaments, setTemperaments] = useState([]);
  const [names, setNames] = useState([]);
  const [select, setSelect] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [imageFile, setImageFile] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    weight_min: 0,
    weight_max: 0,
    height_min: 0,
    height_max: 0,
    life_min: 0,
    life_max: 0,
    image: "",
    file: null,
    temperament: "",
  });
  const [error, setError] = useState({
    name: "",
    weight: "",
    height: "",
    life: "",
  });
  //obtenmer temperaments de la API
  useEffect(() => {
    axios
      .get(`/temperament`)
      .then((response) => {
        setTemperaments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.response.data.error);
        setLoading(false);
      });
  }, []);
  //obtener todos los nombres de la API
  useEffect(() => {
    axios
      .get(`/dogs`)
      .then((response) => {
        let dogs = response.data.map((dog) => dog.name);
        setNames(dogs);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.response.data.error);
        setLoading(false);
      });
  }, []);

  /// setear temperamente y convertirlo a strings para enviarlo al estado de los inputs
  const handleSelect = (e) => {
    setSelect([...select, e.target.value]);
    setInputsTemp([...select, e.target.value]);
  };
  const setInputsTemp = (res) => {
    const value = res
      .map((t) => `${t}, `)
      .join("")
      .slice(0, -2);
    setInputs({
      ...inputs,
      temperament: value,
    });
  };

  /// linkear el estado con los iputs
  const handleInputs = (e) => {
    setInputs({
      //setear inputs
      ...inputs,
      [e.target.name]: e.target.value,
    });
    //validar errore si el campo es name
    if (e.target.name === "name") {
      const veryfiName = names.find((name) => name === e.target.value);
      //verificar nombre repetido
      if (veryfiName) {
        const res = validation(
          {
            ...inputs,
            [e.target.name]: e.target.value,
          },
          true
        );
        setError({
          ...error,
          [e.target.name]: res[e.target.name],
        });
        //sino verificar demas errores en name
      } else {
        const res = validation(
          {
            ...inputs,
            [e.target.name]: e.target.value,
          },
          false
        );
        setError({
          ...error,
          [e.target.name]: res[e.target.name],
        });
      }
      // verificar errores en cualquier otro campo
    } else {
      const res = validation(
        {
          ...inputs,
          [e.target.name]: e.target.value,
        },
        false
      );
      if (e.target.name === "height_min" || e.target.name === "height_max") {
        setError({
          ...error,
          height: res.height,
        });
      }
      if (e.target.name === "weight_min" || e.target.name === "weight_max") {
        setError({
          ...error,
          weight: res.weight,
        });
      }
      if (e.target.name === "life_min" || e.target.name === "life_max") {
        setError({
          ...error,
          life: res.life,
        });
      }
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  ///--------------------------------------------------------------
  ///validar y enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    //validar si hay archivo imagen

    if (inputs.name === "" || inputs.name === undefined || error.name) {
      window.alert("The breed name field contains errors");
    } else if (
      inputs.weight_max <= inputs.weight_min ||
      inputs.height_max <= inputs.height_min ||
      inputs.life_max <= inputs.life_min ||
      error.height ||
      error.weight ||
      error.life
    ) {
      window.alert(
        "The values of 'Height maximum', 'Weight maximum', 'Life maximum' must be greater than 'Height minimun', 'Weight minimun', 'Life minimun' values"
      );
    } else if (inputs.temperament === "") {
      window.alert("You must select at least one temperament");
    } else if (file) {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("/image", formData)
        .then((response) => {
          const res = response.data.path;
          console.log(res);
          setImageFile(res);
          console.log(imageFile);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // objeto a enviar
      const jsonSend = {
        name: inputs.name,
        weight_min: Number(inputs.weight_min),
        weight_max: Number(inputs.weight_max),
        height_min: Number(inputs.height_min),
        height_max: Number(inputs.height_max),
        life: inputs.life_min + " - " + inputs.life_max + " years",
        image: imageFile
          ? imageFile
          : inputs.image
          ? inputs.image
          : "https://i.ibb.co/znL6nKy/dog-no-image.png",
        temperament: inputs.temperament,
      };
      axios
        .post("/dogs", jsonSend)
        .then((res) => {
          window.alert(res.data[0].msj);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          window.alert(error.response.data.err);
        });
      // window.alert(`Breed dog ${jsonSend.name} created`);
    }
  };

  return (
    <div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>CREATE BREED DOG</h1>
            <div>
              <NavLink id={styles.navlink} to={`/home`}>
                <button className={styles.home}>Back to Home</button>
              </NavLink>
            </div>
          </div>
          <div className={styles.formContainer2}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
              {/* /////////////////////name /////////////////*/}
              <label className={styles.label}>*Breed name: </label>
              <input
                className={
                  error.name ? styles.inputNameWarning : styles.inputName
                }
                key="name"
                name="name"
                placeholder="Breed Name"
                type="text"
                value={inputs.name}
                onChange={handleInputs}
              />
              <br></br>
              {error.name && <p className={styles.warningName}>{error.name}</p>}
              <br></br>
              {/* /////////////////////height  /////////////////*/}
              <label className={styles.label}>
                *Height minimun (centimeter):{" "}
              </label>
              <input
                className={
                  inputs.height_min < 0
                    ? styles.inputHeightWarning
                    : styles.inputHeight
                }
                key="height_min"
                name="height_min"
                type="number"
                value={inputs.height_min}
                onChange={handleInputs}
              />
              <label className={styles.label}>
                *Height maximum (centimeter):{" "}
              </label>
              <input
                className={
                  inputs.height_max < 0
                    ? styles.inputHeightWarning2
                    : styles.inputHeight2
                }
                key="height_max"
                name="height_max"
                type="number"
                value={inputs.height_max}
                onChange={handleInputs}
              />
              {error.height && <p className={styles.warning}>{error.height}</p>}
              <br></br>
              {/* /////////////////////weight /////////////////*/}
              <label className={styles.label}>*Weight minimun (pounds): </label>
              <input
                className={
                  inputs.weight_min < 0
                    ? styles.inputHeightWarning
                    : styles.inputHeight
                }
                key="weight_min"
                name="weight_min"
                type="number"
                value={inputs.weight_min}
                onChange={handleInputs}
              />
              <label className={styles.label}>*Weight maximum (pounds): </label>
              <input
                className={
                  inputs.weight_max < 0
                    ? styles.inputHeightWarning2
                    : styles.inputHeight2
                }
                key="weight_max"
                name="weight_max"
                type="number"
                value={inputs.weight_max}
                onChange={handleInputs}
              />
              {error.weight && <p className={styles.warning}>{error.weight}</p>}
              <br></br>
              {/* /////////////////////life /////////////////*/}
              <label className={styles.label}>*Life minimun (years): </label>
              <input
                className={
                  inputs.life_min < 0
                    ? styles.inputHeightWarning
                    : styles.inputHeight
                }
                key="life_min"
                name="life_min"
                type="number"
                value={inputs.life_min}
                onChange={handleInputs}
              />
              <label className={styles.label}>*Life maximum (years): </label>
              <input
                className={
                  inputs.life_max < 0
                    ? styles.inputHeightWarning2
                    : styles.inputHeight2
                }
                key="life_max"
                name="life_max"
                type="number"
                value={inputs.life_max}
                onChange={handleInputs}
              />
              {error.life && <p className={styles.warning}>{error.life}</p>}
              <br></br>
              {/* /////////////////////image /////////////////*/}
              <label className={styles.label}>Image (url): </label>
              <input
                className={styles.url}
                key="image"
                name="image"
                type="url"
                placeholder="http://www.pidogs.com/image/dog.jpg "
                value={inputs.image}
                onChange={handleInputs}
              />
              <input
                accept="image/png,image/jpeg"
                className={styles.file}
                key="file"
                name="file"
                type="file"
                placeholder="select file"
                value={inputs.file}
                onChange={handleFileChange}
              />
              <br></br>
              {/* ////////////////////temperaments ////////////////*/}
              <label className={styles.label2}>*Add temperaments: </label>
              {/* /////////////////////select /////////////////*/}
              <select
                name="select"
                className={styles.select}
                onChange={handleSelect}
              >
                {temperaments.map((temp) => {
                  return (
                    <option key={temp} value={temp}>
                      {temp}
                    </option>
                  );
                })}
              </select>
              {/* /////////////////////select /////////////////*/}
              <br></br>
              <div className={styles.span}>{inputs.temperament}</div>
              <p className={styles.label}>* - Required fields</p>
              {/* /////////////////////submit /////////////////*/}
              <input
                className={styles.home}
                type="submit"
                value="Create Breed"
              ></input>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
