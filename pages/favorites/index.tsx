import { useEffect, useState } from 'react';
import { Layout } from '../../components/layout';
import { NoFav } from '../../components/ui';
import { localFavorites } from '../../utils';
import { FavPokemons } from '../../components/pokemon';

const FavoritePage = () => {
  const [favPokemon, setFavPokemon] = useState<number[]>([]);

  useEffect(() => {
    setFavPokemon(localFavorites.pokemons());
  }, []);

  return (
    <>
      <Layout title="Favorites">
        {favPokemon.length === 0 ? (
          <NoFav />
        ) : (
          <FavPokemons pokemons={favPokemon} />
        )}
      </Layout>
    </>
  );
};
export default FavoritePage;
