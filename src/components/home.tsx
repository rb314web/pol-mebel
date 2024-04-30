import "../assets/style/header.scss";

import { Header } from "./header";
import { Second } from "./second";
import { Card } from "./card";
import { About } from "./about";

export const Home = () => {
  return (
    <div className="home">
      <Header />
      <Card />
      <About />
      <Second />
    </div>
  );
};
