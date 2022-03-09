export class NewTournament {
  constructor(public name: string) {}
}

export class UpdateTournament extends NewTournament {
  constructor(public id: string, name: string) {
    super(name);
  }
}

export class Tournament extends NewTournament {
  constructor(
    public id: string,
    name: string,
    public organizer: string,
    public game: string,
    public participants: ParticipantInfo,
    public startDate: string
  ) {
    super(name);
  }
}

export class DeleteTournament {
  constructor(public id: string) {}
}

export class ParticipantInfo {
  constructor(public current: number, public max: number) {}
}
