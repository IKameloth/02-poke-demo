import { Grid } from '@nextui-org/react';
import { FC } from 'react';
import { FavCardPoke } from './FavCardPoke';

interface Props {
  pokemons: number[];
}

export const FavPokemons: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((id) => (
        <FavCardPoke pokeId={id} key={id} />
      ))}
    </Grid.Container>
  );
};
