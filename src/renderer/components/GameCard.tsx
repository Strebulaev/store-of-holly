import React from 'react';
import styled from 'styled-components';
import { Game } from '../../shared/types';

const Card = styled.div
  background-color: #2a2a2a;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
;

const Image = styled.img
  width: 100%;
  height: 150px;
  object-fit: cover;
;

const Content = styled.div
  padding: 15px;
;

const Title = styled.h3
  margin: 0 0 10px 0;
  color: #ffffff;
;

const Price = styled.div
  color: #1e90ff;
  font-weight: bold;
;

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <Card>
      <Image src={game.image} alt={game.title} />
      <Content>
        <Title>{game.title}</Title>
        <Price></Price>
      </Content>
    </Card>
  );
};

export default GameCard;
