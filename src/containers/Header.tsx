import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from '../theme';

import Button from '../components/Button';
import Input from '../components/Input';
import { createTournament } from '../actions/tournaments';
import { NewTournament } from '../objects';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const handleCreateTournament = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const tournamentName = prompt('Tournament Name:');

    if (tournamentName) {
      dispatch(createTournament(new NewTournament(tournamentName)));
    }
  };

  return (
    <Wrapper>
      <Input placeholder="Search tournament ..." />
      <Button onClick={handleCreateTournament}>CREATE TOURNAMENT</Button>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${theme.spacing(6)} auto;
`;
