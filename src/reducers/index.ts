import { combineReducers } from 'redux';
import { IStore } from '../interfaces';
import tournaments from './tournaments';

const rootReducer = combineReducers<IStore>({
  tournaments
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
