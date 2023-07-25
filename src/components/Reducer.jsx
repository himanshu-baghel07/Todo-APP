// Importing action types from the Action.js file
import { ADD_ITEM, CHANGE_ITEM, DELETE_ITEM } from "./Action";

// Reducer function for managing the state based on dispatched actions
const Reducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      // When ADD_ITEM action is dispatched, add a new item to the state
      return [
        ...state,
        {
          id: action.payload.id,
          text: action.payload.text,
          done: action.payload.done,
          dueDate: action.payload.dueDate,
        },
      ];

    case CHANGE_ITEM:
      // When CHANGE_ITEM action is dispatched, update an existing item in the state
      return state.map((task) => {
        if (task.id === action.id) {
          return {
            ...task,
            done: action.done,
            text: action.text,
            dueDate: action.dueDate,
          };
        }
        return task;
      });

    case DELETE_ITEM:
      // When DELETE_ITEM action is dispatched, remove an item from the state
      return state.filter((task) => task.id !== action.id);

    default:
      // For any other unknown actions, return the current state
      return state;
  }
};

export default Reducer;
