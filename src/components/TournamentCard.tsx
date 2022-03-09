import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteTournament, Tournament, UpdateTournament } from '../objects';
import styled from 'styled-components';
import theme from '../theme';
import H6 from './H6';
import Button from './Button';
import { deleteTournament, updateTournament } from '../actions/tournaments';

const LOCALE = 'en-Gb';
interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = (
  props: TournamentCardProps
) => {
  const {
    id,
    name,
    organizer,
    game,
    participants,
    startDate
  } = props.tournament;
  const dispatch = useDispatch();

  const startDateObject = new Date(startDate);
  const formattedStartDate = startDateObject.toLocaleDateString(LOCALE);
  const formattedStartDateTime = startDateObject.toLocaleTimeString(LOCALE);

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTournamentName = prompt('New Tournament Name:', name);
    console.log(newTournamentName);

    if (newTournamentName) {
      dispatch(updateTournament(new UpdateTournament(id, newTournamentName)));
    }
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (window.confirm('Do you really want to delete this tournament?')) {
      dispatch(deleteTournament(new DeleteTournament(id)));
    }
  };

  return (
    <Wrapper>
      <H6>{name}</H6>

      <p>{`Organizer: ${organizer}`}</p>
      <p>{`Game: ${game}`}</p>
      <p>{`Participants: ${participants.current}/${participants.max}`}</p>
      <p>{`Start: ${startDate}`}</p>
      <p>{`Start: ${formattedStartDate}, ${formattedStartDateTime}`}</p>
      <Button onClick={handleEditClick}>EDIT</Button>
      <DeleteButton onClick={handleDeleteClick}>DELETE</DeleteButton>
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
