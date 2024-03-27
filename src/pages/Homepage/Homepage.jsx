import Features from "../../components/Features/Features";
import Hero from "../../components/Hero/Hero";
import styles from "../../styles";

const Homepage = () => {
  return (
    <div className={`${styles.sectionPaddingX}`}>
      <Hero />
      <Features />
    </div>
  );
};

export default Homepage;
