import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducer";
import rootEpic from "./epics";

const epicMiddleware = createEpicMiddleware();

function configureStore(initialState?: object) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(reduxThunk, epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}

export default configureStore;
