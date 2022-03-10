import React from 'react';
import Container from './components/Container';
import H4 from './components/H4';
import TournamentListContainer from './containers/TournamentListContainer';
import Header from './containers/Header';

// TODO: start
// ...
// Use better grid, current one is not cool with other screens
// Search logic should be handled after created, updated and deleted events.
// I didn't implemented the refecth and state update logics based on search.
// ...
// TODO: end

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
