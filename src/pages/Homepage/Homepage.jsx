import AboutTeam from "../../components/AboutTeam/AboutTeam";
import Contact from "../../components/Contact/Contact";
import Features from "../../components/Features/Features";
import Hero from "../../components/Hero/Hero";
import HeroBottomBanner from "../../components/HeroBottomBanner/HeroBottomBanner";
import Tutorial from "../../components/Tutorial/Tutorial";
import styles from "../../styles";

const Homepage = () => {
  return (
    <div className={`${styles.sectionPaddingX}`}>
      <Hero />
      <Features />
      <Tutorial />
      <AboutTeam />
      <Contact />
      <HeroBottomBanner />
    </div>
  );
};

export default Homepage;
