import React from 'react';
import { Tournament } from '../objects';
import styled from 'styled-components';
import theme from '../theme';
import H6 from './H6';

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = (
  props: TournamentCardProps
) => {
  const { name, organizer, game, participants, startDate } = props.tournament;
  return (
    <Wrapper>
      <H6>{name}</H6>

      <p>{`Organizer: ${organizer}`}</p>
      <p>{`Game: ${game}`}</p>
      <p>{`Participants: ${participants.current}/${participants.max}`}</p>
      <p>{`Start: ${startDate}`}</p>
    </Wrapper>
  );
};

export default TournamentCard;

const Wrapper = styled.div`
  border-radius: ${theme.borderRadius};
  background-color: ${theme.palette.background.base};
  padding: ${theme.spacing(6)};
`;
