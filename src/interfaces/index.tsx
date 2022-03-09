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
  readonly tournaments: Tournament[];
  readonly tournamentsLoading: boolean;
  readonly searchText: string;
  readonly error: string;
}
