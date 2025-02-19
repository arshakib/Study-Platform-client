import StudyPlatformSections from "../Extra Section/StudyPlatformSections";
import Cards from "./Cards";
import Slider from "./Slider";
import Tutor from "./Tutor";

const Home = () => {
  return (
    <div>
      <Slider />
      <Cards />
      <Tutor />
      <StudyPlatformSections />
    </div>
  );
};

export default Home;
