import { easeOut, motion } from "framer-motion";
import "../assets/style/header.scss";

import { Header } from "./header";
import { Second } from "./second";
import { Card } from "./card";
import { About } from "./about";

export const Home = () => {
  return (
    <motion.div className="home"     initial={{x:100, opacity:0}}
    animate={{ x: 0, opacity:1 }}
    transition={{ duration: .3, ease: easeOut }}>
      <Header />
      <Card />
      <About />
      <Second />
    </motion.div>
  );
};
