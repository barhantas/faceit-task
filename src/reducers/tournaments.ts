import { Reducer } from 'redux';
import {
  ITournamentsActions,
  TOURNAMENTS_LOADING,
  TOURNAMENTS_LOADED,
  TOURNAMENTS_LOAD_FAILED,
  TOURNAMENTS_SEARCH_TEXT_UPDATED,
  TOURNAMENT_CREATED,
  TOURNAMENT_UPDATED,
  TOURNAMENT_DELETED
} from '../actions/tournaments';
import { ITournamentsState, TournamentsObject } from '../interfaces';

class TournamentsState implements ITournamentsState {
  constructor(
    public tournamentsObject: TournamentsObject = {},
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
        tournamentsObject: action.tournamentsObject,
        error: ''
      };
    case TOURNAMENTS_LOAD_FAILED:
      return {
        ...state,
        tournamentsLoading: false,
        tournamentsObject: {},
        error: action.error
      };
    case TOURNAMENTS_SEARCH_TEXT_UPDATED:
      return {
        ...state,
        tournamentsLoading: true,
        searchText: action.searchText,
        error: ''
      };
    case TOURNAMENT_CREATED:
      const updatedTournamentsObject = Object.assign(
        { [action.newTournament.id]: action.newTournament },
        state.tournamentsObject
      );

      return {
        ...state,
        tournamentsObject: updatedTournamentsObject
      };
    case TOURNAMENT_UPDATED:
      state.tournamentsObject[action.updatedTournament.id] =
        action.updatedTournament;

      return {
        ...state
      };
    case TOURNAMENT_DELETED:
      delete state.tournamentsObject[action.tournamentId];
      return {
        ...state
      };

    default:
      return state;
  }
};

export default tournaments;
