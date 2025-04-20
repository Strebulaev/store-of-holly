import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../store/gamesSlice';
import styled from 'styled-components';
import GameCard from '../components/GameCard';

const StoreContainer = styled.div
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
;

const StorePage: React.FC = () => {
  const dispatch = useDispatch();
  const { games, loading, error } = useSelector((state: RootState) => state.games);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <StoreContainer>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </StoreContainer>
  );
};

export default StorePage;
