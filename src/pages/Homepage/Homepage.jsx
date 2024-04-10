  import Footer from "../../components/Footer/Footer";
  import AboutTeam from "../../components/User/AboutTeam/AboutTeam";
  import Contact from "../../components/User/Contact/Contact";
  import Features from "../../components/User/Features/Features";
  import Hero from "../../components/User/Hero/Hero";
  import HeroBottomBanner from "../../components/User/HeroBottomBanner/HeroBottomBanner";
  import Navbar from "../../components/User/Navbar/Navbar";
  import Tutorial from "../../components/User/Tutorial/Tutorial";
  import styles from "../../styles";

  const Homepage = ({ currentTheme, toggleCurrentTheme }) => {
    return (
      <>
        <Navbar currentTheme={currentTheme} />
        <div className={`${styles.sectionPaddingX}`}>
          <Hero />
          <Features />
          <Tutorial />
          <AboutTeam />
          <Contact />
          <HeroBottomBanner />
        </div>
        <Footer
          toggleCurrentTheme={toggleCurrentTheme}
          currentTheme={currentTheme}
        />
      </>
    );
  };

  export default Homepage;
