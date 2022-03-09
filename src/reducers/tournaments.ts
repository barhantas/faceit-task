import { Reducer } from 'redux';
import {
  ITournamentsActions,
  TOURNAMENTS_LOADING,
  TOURNAMENTS_LOADED,
  TOURNAMENTS_LOAD_FAILED,
  TOURNAMENTS_SEARCH_TEXT_UPDATED
} from '../actions/tournaments';
import { ITournamentsState } from '../interfaces';
import { Tournament } from '../objects';

class TournamentsState implements ITournamentsState {
  constructor(
    public tournaments: Tournament[] = [],
    public tournamentsLoading: boolean = false,
    public searchText: string = '',
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
    case TOURNAMENTS_SEARCH_TEXT_UPDATED:
      return {
        ...state,
        tournamentsLoading: true,
        searchText: action.searchText,
        error: ''
      };
    default:
      return state;
  }
};

export default tournaments;
