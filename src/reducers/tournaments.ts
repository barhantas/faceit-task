import { Reducer } from 'redux';
import {
  ITournamentsActions,
  TOURNAMENTS_LOADING,
  TOURNAMENTS_LOADED,
  TOURNAMENTS_LOAD_FAILED
} from '../actions/tournaments';
import { ITournamentsState } from '../interfaces';
import { Tournament } from '../objects';

class TournamentsState implements ITournamentsState {
  constructor(
    public tournaments: Tournament[] = [],
    public tournamentsLoading: boolean = false,
    public error: string = ''
  ) {}
}

const tournaments: Reducer<TournamentsState, ITournamentsActions> = (
  state: ITournamentsState = new TournamentsState(),
  action: ITournamentsActions
) => {
  switch (action.type) {
    case TOURNAMENTS_LOADING:
      return {
        ...state,
        tournamentsLoading: true,
        error: ''
      };
    case TOURNAMENTS_LOADED:
      return {
        ...state,
        tournamentsLoading: false,
        tournaments: action.tournaments,
        error: ''
      };
    case TOURNAMENTS_LOAD_FAILED:
      return {
        ...state,
        tournamentsLoading: false,
        tournaments: [],
        error: action.error
      };
    default:
      return state;
  }
};

export default tournaments;
