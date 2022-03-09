import { Action } from 'redux';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { NewTournament, ParticipantInfo, Tournament } from '../objects';
import { RootState } from '../reducers';

export const TOURNAMENTS_LOADING = 'TOURNAMENTS_LOADING';
export type TOURNAMENTS_LOADING = typeof TOURNAMENTS_LOADING;
export const TOURNAMENTS_LOADED = 'TOURNAMENTS_LOADED';
export type TOURNAMENTS_LOADED = typeof TOURNAMENTS_LOADED;
export const TOURNAMENTS_LOAD_FAILED = 'TOURNAMENTS_LOAD_FAILED';
export type TOURNAMENTS_LOAD_FAILED = typeof TOURNAMENTS_LOAD_FAILED;

export interface ITournamentsLoading extends Action {
  type: TOURNAMENTS_LOADING;
}

export interface ITournamentsLoaded extends Action {
  type: TOURNAMENTS_LOADED;
  tournaments: Tournament[];
}

export interface ITournamentsLoadFailed extends Action {
  type: TOURNAMENTS_LOAD_FAILED;
  error: string;
}

export type ITournamentsActions =
  | ITournamentsLoading
  | ITournamentsLoaded
  | ITournamentsLoadFailed;

export const tournamentsLoading = (loading: boolean) => {
  return { type: TOURNAMENTS_LOADING, loading };
};

export const tournamentsLoaded = (tournaments: Tournament[]) => {
  return { type: TOURNAMENTS_LOADED, tournaments };
};

export const tournamentsLoadFailed = (error: string) => {
  return { type: TOURNAMENTS_LOAD_FAILED, error };
};

export const fetchTournaments = () => {
  //@ts-ignore
  return dispatch => {
    dispatch(tournamentsLoading(true));

    fetch(API_TOURNAMENTS_URL)
      .then(response => {
        //uncomment for testing error case
        // throw Error(response.statusText);

        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(tournamentsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then((items: Tournament[]) =>
        dispatch(
          tournamentsLoaded(
            items.map(
              ({ id, name, organizer, game, participants, startDate }) =>
                new Tournament(
                  id,
                  name,
                  organizer,
                  game,
                  new ParticipantInfo(participants.current, participants.max),
                  startDate
                )
            )
          )
        )
      )
      .catch(error => dispatch(tournamentsLoadFailed(error)));
  };
};

export const createTournament = (newTournament: NewTournament) => {
  //@ts-ignore
  return dispatch => {
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
      .then(
        (item: Tournament) => console.log('item', item)
        // dispatch(
        //   tournamentsLoaded(
        //     items.map(
        //       ({ id, name, organizer, game, participants, startDate }) =>
        //         new Tournament(
        //           id,
        //           name,
        //           organizer,
        //           game,
        //           new ParticipantInfo(participants.current, participants.max),
        //           startDate
        //         )
        //     )
        //   )
        // )
      )
      .catch(error => dispatch(tournamentsLoadFailed(error)));
  };
};
