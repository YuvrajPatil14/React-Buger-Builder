import * as actionTypes from "../actions/actionTypes";
import {updateObject} from '../../shared/utility'

const ING_PRICES = {
  salad: 0.5,
  bacon: 0.3,
  cheese: 1.3,
  meat: 0.8,
};
const initialState = {
  ingredients: null,
  error: false,
  totalPrice: 4,
  building:false,
};
const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + ING_PRICES[action.ingredientName],
    building:true
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredientr = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredientsr = updateObject(
    state.ingredients,
    updatedIngredientr
  );
  const updatedStater = {
    building:true,
    ingredients: updatedIngredientsr,
    totalPrice: state.totalPrice - ING_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedStater);
};
const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    building:false
  });
};
const fetchFailed = (state, action) => {
  return updateObject(state, {
    error: true,
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
