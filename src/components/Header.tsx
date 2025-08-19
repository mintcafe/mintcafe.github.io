import { Component, createSignal, onCleanup, onMount } from "solid-js";
import * as THREE from "three";

const Header: Component = () => {
  const [isMobileOpen, setIsMobileOpen] = createSignal(false);
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
      <nav class="absolute top-0 left-0 right-0 z-20">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between relative">
          <a href="#" class="text-white text-2xl font-extrabold tracking-tight">
            کافه نعناع
          </a>
          <ul class="hidden md:flex items-center gap-6 text-white/90">
            <li>
              <a href="#about" class="hover:text-white">
                درباره ما
              </a>
            </li>
            <li>
              <a href="#menu" class="hover:text-white">
                منو
              </a>
            </li>
            <li>
              <a href="#gallery" class="hover:text-white">
                گالری
              </a>
            </li>
            <li>
              <a href="#contact" class="hover:text-white">
                تماس
              </a>
            </li>
          </ul>
          <button
            type="button"
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-expanded={isMobileOpen() ? "true" : "false"}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileOpen(!isMobileOpen())}
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {isMobileOpen() && (
            <ul
              id="mobile-nav"
              class="md:hidden absolute top-full right-4 left-4 bg-white/90 backdrop-blur text-green-900 rounded-xl shadow-lg p-4 mt-2 space-y-2"
            >
              <li>
                <a
                  href="#about"
                  class="block px-3 py-2 rounded hover:bg-green-50"
                  onClick={() => setIsMobileOpen(false)}
                >
                  درباره ما
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  class="block px-3 py-2 rounded hover:bg-green-50"
                  onClick={() => setIsMobileOpen(false)}
                >
                  منو
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  class="block px-3 py-2 rounded hover:bg-green-50"
                  onClick={() => setIsMobileOpen(false)}
                >
                  گالری
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  class="block px-3 py-2 rounded hover:bg-green-50"
                  onClick={() => setIsMobileOpen(false)}
                >
                  تماس
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <div class="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white z-10">
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
            class="dropdown-menu hidden absolute right-0 top-full mt-2 md:right-full md:top-0 md:mt-0 md:mr-4 bg-white p-4 rounded-lg shadow-xl text-green-700 flex flex-col space-y-2 min-w-max"
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
