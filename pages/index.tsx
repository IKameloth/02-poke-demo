import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/layout";

const HomePage: NextPage = (props) => {
  console.log({ props });
  return (
    <Layout title="PokeList">
      <h1>Hola mundo</h1>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log("hola mundo");
  return {
    props: { name: "Cmatteo" },
  };
};

export default HomePage;
