import { createStore, applyMiddleware, Store } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducer';
import { PERSIST_CONFIG } from './persist';
import middlewares from './middleware';

const middleWareEnhancer = applyMiddleware(...middlewares);
const persistedReducer = persistReducer(PERSIST_CONFIG, rootReducer);

export type AppState = ReturnType<typeof rootReducer>;
export const store: Store  = createStore(
  persistedReducer,
  composeWithDevTools(middleWareEnhancer),
);
export const persistor = persistStore(store);
