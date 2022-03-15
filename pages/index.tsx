import type { GetStaticProps, NextPage } from "next";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { pokeApi } from "../api";
import { Layout } from "../components/layout";
import { PokeListResponse, SmallPokemon } from "../interfaces/poke-list";
import { PokemonCard } from "../components/pokemon";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="PokeList">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokeListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
      i + 1
    }.png`,
  }));

  return {
    props: { pokemons },
  };
};

export default HomePage;
