import { FC } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

interface Props {
  title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {
  
  return (
    <>
      <Head>
        <title>{title || "PokeInfo Demo"}</title>
        <meta name="author" content="CMatteo" />
        <meta name="description" content="Info pokemon" />
        <meta name="keywords" content="poke, pokedex" />

        <meta
          property="og:title"
          content={`Info pokemon ${title}`}
        />
        <meta
          property="og:description"
          content={`Page about ${title} pokemon`}
        />
        <meta
          property="og:image"
          content={`${origin}/img/banner.png`}
        />
      </Head>

      <Navbar />
      <main>{children}</main>
    </>
  );
};
