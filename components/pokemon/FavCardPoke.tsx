import { Card, Grid } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
  pokeId: number;
}

export const FavCardPoke: FC<Props> = ({ pokeId }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/pokemon/${pokeId}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={pokeId} onClick={handleClick}>
      <Card hoverable clickable css={{ padding: 10 }}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`}
          width={'100%'}
          height={140}
        />
      </Card>
    </Grid>
  );
};
