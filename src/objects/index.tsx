export class Tournament {
  constructor(
    public id: string,
    public name: string,
    public organizer: string,
    public game: string,
    public participants: ParticipantInfo,
    public startDate: string
  ) {}
}

export class ParticipantInfo {
  constructor(public current: number, public max: number) {}
}
