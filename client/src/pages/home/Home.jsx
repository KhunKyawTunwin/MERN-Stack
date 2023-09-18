import { Brand, Featured, Slide } from "../../components";
import Possibility from "../possibility/Possibility";
import Features from "../features/Features";
import "./Home.scss";

const Home = () => {
  return (
    <div>
      <Featured />
      <Brand />
      <Slide />
      <Possibility />
      <Features />
    </div>
  );
};
export default Home;
