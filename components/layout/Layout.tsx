import { FC } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

interface Props {
  title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "PokeInfo Demo"}</title>
        <meta name="author" content="CMatteo" />
        <meta name="description" content="Info poke XXX" />
        <meta name="keywords" content="XXX, poke, pokedex" />
      </Head>

      <Navbar />
      <main>{children}</main>
    </>
  );
};
