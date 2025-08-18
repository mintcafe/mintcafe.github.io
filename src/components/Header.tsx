import { Component, createEffect, onMount } from "solid-js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Header: Component = () => {
  return (
    <div class="bg-green-900 rounded-b-3xl shadow-lg py-6 flex justify-center items-center relative overflow-hidden">
      <h1 class="text-white text-2xl font-bold">کافه نعنا</h1>
    </div>
  );
};

export default Header;
