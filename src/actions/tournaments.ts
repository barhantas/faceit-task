import { Action, Dispatch } from 'redux';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { ITournament, TournamentsObject } from '../interfaces';
import {
  DeleteTournament,
  NewTournament,
  ParticipantInfo,
  Tournament,
  UpdateTournament
} from '../objects';

export const TOURNAMENTS_LOADING = 'TOURNAMENTS_LOADING';
export type TOURNAMENTS_LOADING = typeof TOURNAMENTS_LOADING;
export const TOURNAMENTS_LOADED = 'TOURNAMENTS_LOADED';
export type TOURNAMENTS_LOADED = typeof TOURNAMENTS_LOADED;
export const TOURNAMENTS_LOAD_FAILED = 'TOURNAMENTS_LOAD_FAILED';
export type TOURNAMENTS_LOAD_FAILED = typeof TOURNAMENTS_LOAD_FAILED;
export const TOURNAMENTS_SEARCH_TEXT_UPDATED =
  'TOURNAMENTS_SEARCH_TEXT_UPDATED';
export type TOURNAMENTS_SEARCH_TEXT_UPDATED = typeof TOURNAMENTS_SEARCH_TEXT_UPDATED;
export const TOURNAMENT_CREATED = 'TOURNAMENT_CREATED';
export type TOURNAMENT_CREATED = typeof TOURNAMENT_CREATED;
export const TOURNAMENT_UPDATED = 'TOURNAMENT_UPDATED';
export type TOURNAMENT_UPDATED = typeof TOURNAMENT_UPDATED;
export const TOURNAMENT_DELETED = 'TOURNAMENT_DELETED';
export type TOURNAMENT_DELETED = typeof TOURNAMENT_DELETED;

export interface ITournamentsLoading extends Action {
  type: TOURNAMENTS_LOADING;
}

export interface ITournamentsLoaded extends Action {
  type: TOURNAMENTS_LOADED;
  tournamentsObject: TournamentsObject;
}

export interface ITournamentsLoadFailed extends Action {
  type: TOURNAMENTS_LOAD_FAILED;
  error: string;
}

export interface ITournamentsSearchTextUpdated extends Action {
  type: TOURNAMENTS_SEARCH_TEXT_UPDATED;
  searchText: string;
}

export interface ITournamentCreated extends Action {
  type: TOURNAMENT_CREATED;
  newTournament: Tournament;
}

export interface ITournamentUpdated extends Action {
  type: TOURNAMENT_UPDATED;
  updatedTournament: Tournament;
}

export interface ITournamentDeleted extends Action {
  type: TOURNAMENT_DELETED;
  tournamentId: string;
}

export type ITournamentsActions =
  | ITournamentsLoading
  | ITournamentsLoaded
  | ITournamentsLoadFailed
  | ITournamentsSearchTextUpdated
  | ITournamentCreated
  | ITournamentUpdated
  | ITournamentDeleted;

export const tournamentsLoading = (): ITournamentsLoading => {
  return { type: TOURNAMENTS_LOADING };
};

export const tournamentsLoaded = (
  tournamentsObject: TournamentsObject
): ITournamentsLoaded => {
  return { type: TOURNAMENTS_LOADED, tournamentsObject };
};

export const tournamentsLoadFailed = (
  error: string
): ITournamentsLoadFailed => {
  return { type: TOURNAMENTS_LOAD_FAILED, error };
};

export const tournamentsSearchTextUpdated = (
  searchText: string
): ITournamentsSearchTextUpdated => {
  return { type: TOURNAMENTS_SEARCH_TEXT_UPDATED, searchText };
};

export const tournamentCreated = (
  newTournament: Tournament
): ITournamentCreated => {
  return { type: TOURNAMENT_CREATED, newTournament };
};

export const tournamentUpdated = (
  updatedTournament: Tournament
): ITournamentUpdated => {
  return { type: TOURNAMENT_UPDATED, updatedTournament };
};

export const tournamentDeleted = (tournamentId: string): ITournamentDeleted => {
  return { type: TOURNAMENT_DELETED, tournamentId };
};

export const fetchTournaments = (q?: string) => {
  return (
    dispatch: Dispatch<
      ITournamentsLoading | ITournamentsLoaded | ITournamentsLoadFailed
    >
  ) => {
    dispatch(tournamentsLoading());
    fetch(`${API_TOURNAMENTS_URL}?q=${q ?? ''}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(tournamentsLoading());

        return response;
      })
      .then(response => response.json())
      .then((items: ITournament[]) => {
        const tournamentsObject: TournamentsObject = {};
        items.forEach(
          ({ id, name, organizer, game, participants, startDate }) => {
            tournamentsObject[id] = new Tournament(
              id,
              name,
              organizer,
              game,
              new ParticipantInfo(participants.current, participants.max),
              startDate
            );
          }
        );

        dispatch(tournamentsLoaded(tournamentsObject));
      })
      .catch(error => dispatch(tournamentsLoadFailed(error)));
  };
};

export const createTournament = (newTournament: NewTournament) => {
  return (dispatch: Dispatch<ITournamentCreated | ITournamentsLoadFailed>) => {
    fetch(API_TOURNAMENTS_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTournament)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then((item: ITournament) => {
        const { id, name, organizer, game, participants, startDate } = item;
        dispatch(
          tournamentCreated(
            new Tournament(
              id,
              name,
              organizer,
              game,
              new ParticipantInfo(participants.current, participants.max),
              startDate
            )
          )
        );
      })
      .catch(error => dispatch(tournamentsLoadFailed(error)));
  };
};

export const updateTournament = (updateTournament: UpdateTournament) => {
  return (dispatch: Dispatch<ITournamentUpdated | ITournamentsLoadFailed>) => {
    fetch(`${API_TOURNAMENTS_URL}/${updateTournament.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateTournament)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then((item: ITournament) => {
        const { id, name, organizer, game, participants, startDate } = item;
        dispatch(
          tournamentUpdated(
            new Tournament(
              id,
              name,
              organizer,
              game,
              new ParticipantInfo(participants.current, participants.max),
              startDate
            )
          )
        );
      })
      .catch(error => dispatch(tournamentsLoadFailed(error)));
  };
};

export const deleteTournament = (deleteTournament: DeleteTournament) => {
  return (dispatch: Dispatch<ITournamentDeleted | ITournamentsLoadFailed>) => {
    fetch(`${API_TOURNAMENTS_URL}/${deleteTournament.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(() => {
        dispatch(tournamentDeleted(deleteTournament.id));
      })
      .catch(error => dispatch(tournamentsLoadFailed(error)));
  };
};
