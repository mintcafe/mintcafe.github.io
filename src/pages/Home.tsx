import { Component } from "solid-js";
import Header from "../components/Header";
import Menu from "../components/Menu";

const Home: Component = () => {
  return (
    <div>
      <Header />
      <Menu />
      <footer class="bg-green-900 text-white text-center py-6">
        <p>© 2025 کافه نعناع. تمام حقوق محفوظ است.</p>
      </footer>
    </div>
  );
};

export default Home;
