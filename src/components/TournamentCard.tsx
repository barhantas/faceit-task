import React from 'react';
import { Tournament } from '../objects';
import styled from 'styled-components';
import theme from '../theme';
import H6 from './H6';
import Button from './Button';

const LOCALE = 'en-Gb';
interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = (
  props: TournamentCardProps
) => {
  const { name, organizer, game, participants, startDate } = props.tournament;

  const startDateObject = new Date(startDate);
  const formattedStartDate = startDateObject.toLocaleDateString(LOCALE);
  const formattedStartDateTime = startDateObject.toLocaleTimeString(LOCALE);

  return (
    <Wrapper>
      <H6>{name}</H6>

      <p>{`Organizer: ${organizer}`}</p>
      <p>{`Game: ${game}`}</p>
      <p>{`Participants: ${participants.current}/${participants.max}`}</p>
      <p>{`Start: ${startDate}`}</p>
      <p>{`Start: ${formattedStartDate}, ${formattedStartDateTime}`}</p>
      <Button>EDIT</Button>
      <DeleteButton>DELETE</DeleteButton>
    </Wrapper>
  );
};

export default TournamentCard;

const Wrapper = styled.div`
  border-radius: ${theme.borderRadius};
  background-color: ${theme.palette.background.base};
  padding: ${theme.spacing(6)};
`;

const DeleteButton = styled(Button)`
  margin-left: ${theme.spacing(2)};
`;
