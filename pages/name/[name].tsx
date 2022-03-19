import { useState } from 'react';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { pokeApi } from '../../api';
import { Layout } from '../../components/layout';
import { PokeListResponse, Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';
import confetti from 'canvas-confetti';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFav, setIsInFav] = useState(localFavorites.existInFav(pokemon.id));
  const onToggleFav = () => {
    localFavorites.toggleFavorites(pokemon.id);
    setIsInFav(!isInFav);

    if (isInFav) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.['official-artwork'].front_default ||
                  'no-image'
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h1>{pokemon.name}</Text>
              <Button color="gradient" ghost={!isInFav} onClick={onToggleFav}>
                {!isInFav ? 'Add Fav' : 'Fav'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
//   const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);
  const { data } = await pokeApi.get<PokeListResponse>("/pokemon?limit=151");
  const pokeNames: string[] = data.results.map((poke) => poke.name)

  return {
    paths: pokeNames.map((name) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};

export default PokemonByNamePage;
