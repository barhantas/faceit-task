import React from 'react';
import Container from './components/Container';
import H4 from './components/H4';
import TournamentListContainer from './containers/TournamentListContainer';
import Header from './containers/Header';

const App: React.FC = () => {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <Header />
      <TournamentListContainer />
    </Container>
  );
};

export default App;
