import { Component, onCleanup, onMount } from "solid-js";
import * as THREE from "three";

const Header: Component = () => {
  onMount(() => {
    const canvas = document.getElementById(
      "threejs-canvas"
    ) as HTMLCanvasElement;
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    const scene: THREE.Scene = new THREE.Scene();
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const particlesCnt: number = 8000;
    const posArray: Float32Array = new Float32Array(particlesCnt * 3);
    const velocities: Float32Array = new Float32Array(particlesCnt * 3);
    for (let i: number = 0; i < particlesCnt * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 10;
      posArray[i + 1] = (Math.random() - 0.5) * 10;
      posArray[i + 2] = (Math.random() - 0.5) * 10;
      velocities[i] = (Math.random() - 0.5) * 0.01;
      velocities[i + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i + 2] = (Math.random() - 0.5) * 0.01;
    }
    const particlesGeometry: THREE.BufferGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const material: THREE.PointsMaterial = new THREE.PointsMaterial({
      size: 0.008,
      color: 0x98fb98,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.7,
    });

    const particlesMesh: THREE.Points = new THREE.Points(
      particlesGeometry,
      material
    );
    scene.add(particlesMesh);

    camera.position.z = 5;

    let animationFrameId: number;
    function animate(): void {
      animationFrameId = requestAnimationFrame(animate);
      const positions: Float32Array = particlesGeometry.attributes.position
        .array as Float32Array;
      for (let i: number = 0; i < particlesCnt * 3; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        if (Math.abs(positions[i]) > 5) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 5) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 5) velocities[i + 2] *= -1;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      particlesMesh.rotation.y += 0.0003;
      renderer.render(scene, camera);
    }
    animate();

    const onResize = (): void => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const orderButton: HTMLElement | null =
      document.getElementById("order-button");
    const dropdownMenu: HTMLElement | null =
      document.getElementById("dropdown-menu");
    const onOrderClick = (): void => {
      dropdownMenu?.classList.toggle("hidden");
      const isOpen = !dropdownMenu?.classList.contains("hidden");
      if (orderButton) {
        orderButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }
    };
    orderButton?.addEventListener("click", onOrderClick);

    onCleanup(() => {
      window.removeEventListener("resize", onResize);
      orderButton?.removeEventListener("click", onOrderClick);
      cancelAnimationFrame(animationFrameId);
      particlesGeometry.dispose();
      material.dispose();
      renderer.dispose();
    });
  });

  return (
    <header class="relative h-screen overflow-hidden">
      <canvas
        id="threejs-canvas"
        class="absolute inset-0 w-full h-full -z-10 pointer-events-none"
      ></canvas>
      <div class="absolute inset-0 bg-green-900 bg-opacity-20 z-0 pointer-events-none"></div>
      <nav class="absolute top-0 left-0 right-0 flex justify-center space-x-6 pt-4 z-20">
        <a href="#" class="text-white hover:text-green-300">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.58 8.06 8.24 8.88v-6.28H7.5v-2.6h2.78V9.72c0-2.74 1.67-4.24 4.12-4.24 1.17 0 2.18.09 2.47.13v2.87h-1.7c-1.33 0-1.59.63-1.59 1.56v2.05h3.18l-.42 2.6h-2.76v6.28c4.66-.82 8.24-4.47 8.24-8.88 0-5.5-4.46-9.96-9.96-9.96z" />
          </svg>
        </a>
        <a href="#" class="text-white hover:text-green-300">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.41 3.58 8.06 8.24 8.88v-6.28H7.5v-2.6h2.78V9.72c0-2.74 1.67-4.24 4.12-4.24 1.17 0 2.18.09 2.47.13v2.87h-1.7c-1.33 0-1.59.63-1.59 1.56v2.05h3.18l-.42 2.6h-2.76v6.28c4.66-.82 8.24-4.47 8.24-8.88 0-5.51-4.45-9.96-9.96-9.96z" />
          </svg>
        </a>
        <a href="#" class="text-white hover:text-green-300">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.41 3.58 8.06 8.24 8.88v-6.28H7.5v-2.6h2.78V9.72c0-2.74 1.67-4.24 4.12-4.24 1.17 0 2.18.09 2.47.13v2.87h-1.7c-1.33 0-1.59.63-1.59 1.56v2.05h3.18l-.42 2.6h-2.76v6.28c4.66-.82 8.24-4.47 8.24-8.88 0-5.51-4.45-9.96-9.96-9.96z" />
          </svg>
        </a>
      </nav>
      <div class="relative container mx-auto h-full flex flex-col justify-center items-center text-center text-white z-10">
        <h1 class="text-5xl md:text-7xl font-extrabold fade-in">کافه نعناع</h1>
        <p class="text-xl md:text-2xl mt-4 fade-in">
          طعم طبیعت، آرامش بی‌نهایت
        </p>
        <a
          href="#menu"
          class="mt-6 px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold hover-scale"
        >
          مشاهده منو
        </a>
        <div class="mt-6 relative inline-block">
          <button
            id="order-button"
            class="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold cursor-pointer hover-scale"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-controls="dropdown-menu"
          >
            سفارش آنلاین
          </button>
          <div
            id="dropdown-menu"
            class="dropdown-menu hidden absolute right-full top-0 mr-4 bg-white p-4 rounded-lg shadow-xl text-green-700 flex flex-col space-y-2 min-w-max"
            role="menu"
          >
            <a
              href="https://snappfood.ir"
              class="hover:underline hover:text-green-900 transition"
            >
              سفارش از اسنپ فود
            </a>
            <a
              href="https://tapsifood.ir"
              class="hover:underline hover:text-green-900 transition"
            >
              سفارش از تپسی فود
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
