import { Component } from "solid-js";
import Header from "../components/Header";
import Menu from "../components/Menu";
import About from "../components/About";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home: Component = () => {
  return (
    <div>
      <Header />
      <About />
      <Menu />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
