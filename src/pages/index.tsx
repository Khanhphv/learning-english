import Layout from "components/layout";
import Lottie from "lottie-react";
import background from "constants/background.json";
import Head from "next/head";
import styles from "./page.module.scss";

const Home = () => {
  return (
    <>
      <Head>
        <title>Learning English</title>
      </Head>
      <div>
        <Lottie
          className={styles.main}
          animationData={background}
          loop={true}
        />
      </div>
    </>
  );
};
Home.getLayout = Layout;
export default Home;
