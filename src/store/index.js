import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import persist from '../services/reduxPersist';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  version: 1,
  whitelist: ['weather', 'common'],
};

const persistedReducer = persist(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [sagaMiddleware],
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
