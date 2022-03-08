import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Container from './components/Container';
import H4 from './components/H4';
import TournamentListContainer from './containers/TournamentListContainer';
import { IStore } from './interfaces';

const App: React.FC = () => {
  const tournamentsReducer = useSelector((state: IStore) => state.tournaments);
  const { tournaments, tournamentsLoading } = tournamentsReducer;
  useEffect(() => {
    console.log('tournaments', tournaments);
    console.log('tournamentsLoading', tournamentsLoading);
  }, []);

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <TournamentListContainer />
    </Container>
  );
};

export default App;
