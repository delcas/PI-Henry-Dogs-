import axios from "axios";
export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_NAMES = "GET_NAMES";
export const GET_ID = "GET_ID";
export const LOADING = "LOADING";
export const LOADING_TRUE = "LOADING_TRUE";
export const ORDER_BY = "ORDER_BY";
export const SEARCH = "SEARCH"
export const SEARCH_BAR = "SEARCH_BAR"
export const SET_STATE ="SET_STATE"

export const ORDER_NAME_ASC = "ORDER_NAME_ASC";
export const ORDER_NAME_DES = "ORDER_NAME_DES";
export const ORDER_WEIGHT_MIN = "ORDER_WEIGHT_MIN";
export const ORDER_WEIGHT_MAX = "ORDER_WEIGHT_MAX";
export const BREEDS_SEARCH = "BREEDS_SEARCH";

export const getAllBreeds = (order) => async (dispatch) => {
  axios
    .get(`/dogs`)
    .then((response) => {
      if (order === "None") {
        dispatch({
          type: GET_ALL_BREEDS,
          payload: response.data,
        });
      }
      dispatch({
        type: BREEDS_SEARCH,
        payload: response.data,
      });
    })
    .then(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    })
    .catch((error) => {
      console.log(error);
      window.alert(error.response.data.error);
    });
};

export const getNames = (name) => {
  return {
    type: GET_NAMES,
    payload: name,
  }
};
export const getId = (id) => {
  return {
    type: GET_ID,
    payload: id,
  }
};
export const getTemperaments = (temperament) => {
  return {
    type: GET_TEMPERAMENTS,
    payload: temperament,
  }
};


export const loading = () => {
  return {
    type: LOADING_TRUE,
    payload: true,
  };
};
export const orderBy = (order) => {
  return {
    type: ORDER_BY,
    payload: order,
  };
};
export const search = (seacrh) => {
  return {
    type: SEARCH,
    payload: seacrh,
  };
};
export const searchBar = (seacrh) => {
  return {
    type: SEARCH_BAR,
    payload: seacrh,
  };
};
export const setState = (oldState) => {
  return {
    type: SET_STATE,
    payload: oldState,
  };
};

export const orderNameAsc = () => {
  return {
    type: ORDER_NAME_ASC,
  };
};
export const orderNameDes = () => {
  return {
    type: ORDER_NAME_DES,
  };
};
export const orderWeightMin = () => {
  return {
    type: ORDER_WEIGHT_MIN,
  };
};
export const orderWeightMax = () => {
  return {
    type: ORDER_WEIGHT_MAX,
  };
};
