import { Tournament } from '../objects';

//Business
export interface ITournament {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: IParticipantInfo;
  startDate: string;
}

export interface IParticipantInfo {
  current: number;
  max: number;
}

//Store
export interface IStore {
  readonly tournaments: ITournamentsState;
}

export interface ITournamentsState {
  readonly tournamentsObject: TournamentsObject;
  readonly tournamentsLoading: boolean;
  readonly searchText: string;
  readonly error: string;
}

export interface TournamentsObject {
  [key: string]: Tournament;
}
