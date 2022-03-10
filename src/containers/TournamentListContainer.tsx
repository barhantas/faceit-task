import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CenteredBox from '../components/CenteredBox';
import Button from '../components/Button';
import TournamentCard from '../components/TournamentCard';
import GridContainer from '../components/GridContainer';
import { fetchTournaments } from '../actions/tournaments';
import { IStore } from '../interfaces';

const TournamentListContainer: React.FC = () => {
  const dispatch = useDispatch();
  const tournamentsReducer = useSelector((state: IStore) => state.tournaments);
  const { tournamentsObject, tournamentsLoading, error } = tournamentsReducer;

  useEffect(() => {
    getTournaments();
  }, []);

  const getTournaments = () => {
    dispatch(fetchTournaments());
  };

  if (tournamentsLoading) {
    return <CenteredBox>Loading Tournaments ...</CenteredBox>;
  }

  if (error) {
    return (
      <CenteredBox>
        Something went wrong.
        <Button
          onClick={() => {
            getTournaments();
          }}
        >
          Retry
        </Button>
      </CenteredBox>
    );
  }

  if (!Object.keys(tournamentsObject).length) {
    return <CenteredBox>No tournaments found.</CenteredBox>;
  }

  return (
    <GridContainer>
      {Object.keys(tournamentsObject).map((tournamentId, index) => (
        <TournamentCard
          key={index}
          tournament={tournamentsObject[tournamentId]}
        />
      ))}
    </GridContainer>
  );
};

export default TournamentListContainer;
