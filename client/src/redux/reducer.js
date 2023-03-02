import {
  GET_ALL_BREEDS,
  GET_TEMPERAMENTS,
  GET_NAMES,
  LOADING,
  LOADING_TRUE,
  ORDER_BY,
  SEARCH,
  ORDER_NAME_ASC,
  ORDER_NAME_DES,
  ORDER_WEIGHT_MIN,
  ORDER_WEIGHT_MAX,
  SEARCH_BAR,
  BREEDS_SEARCH,
  SET_STATE,
  GET_ID,
} from "./actions";

// estado inicial
const initialState = {
  breeds: [],
  breedSearch: [],
  order: "None",
  loading: true,
  search: "Name",
  searchBar: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BREEDS:
      return {
        ...state,
        breeds: action.payload,
      };
    case BREEDS_SEARCH:
      return {
        ...state,
        breedSearch: action.payload,
      };
    case SET_STATE:
      return {
        ...state,
        breeds: action.payload,
      };

    case GET_NAMES:
      return {
        ...state,
        breeds: state.breeds.filter((e) => e.name === action.payload),
      };
    case GET_ID:
      return {
        ...state,
        breeds: state.breeds.filter((e) => e.id == action.payload),
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        breeds: state.breeds.filter((e) => {
          if (e.temperament) {
            const temperaments = e.temperament.split(", ");
            return temperaments.includes(action.payload);
          }
        }),
      };
    case LOADING:
      return {
        ...state,
        loading: state.loading && action.payload,
      };
    case LOADING_TRUE:
      return {
        ...state,
        loading: !state.loading && action.payload,
      };
    case ORDER_BY:
      return {
        ...state,
        order: action.payload,
      };
    case SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case SEARCH_BAR:
      return {
        ...state,
        searchBar: action.payload,
      };
    case ORDER_NAME_ASC:
      return {
        ...state,
        breeds: state.breeds.sort((a, b) => {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        }),
      };
    case ORDER_NAME_DES:
      return {
        ...state,
        breeds: state.breeds.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }),
      };
    case ORDER_WEIGHT_MIN:
      return {
        ...state,
        breeds: state.breeds.sort((a, b) => {
          const weightA = Number(a.weight_min);
          const weightB = Number(b.weight_min);
          if (Number.isNaN(weightA) && Number.isNaN(weightB)) {
            return 0;
          } else if (Number.isNaN(weightA)) {
            return 1;
          } else if (Number.isNaN(weightB)) {
            return -1;
          } else {
            return weightA - weightB;
          }
        }),
      };
    case ORDER_WEIGHT_MAX:
      return {
        ...state,
        breeds: state.breeds.sort((a, b) => {
          const aWeight = a.weight_max ? parseInt(a.weight_max) : -Infinity;
          const bWeight = b.weight_max ? parseInt(b.weight_max) : -Infinity;
          return bWeight - aWeight;
        }),
      };
    default:
      return { ...state };
  }
};
export default reducer;
