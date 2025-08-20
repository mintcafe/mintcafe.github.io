import { Component, createSignal, onCleanup, onMount } from "solid-js";
import * as THREE from "three";
import Logo from "../assets/logo.png";

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

    // Background: green mint gradient (canvas texture) + floating mint leaves
    function createMintGradientTexture(): THREE.CanvasTexture {
      const size = 1024;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const grad = ctx.createLinearGradient(0, 0, 0, size);
      grad.addColorStop(0, "#E6FFF2");
      grad.addColorStop(0.5, "#C9F7E1");
      grad.addColorStop(1, "#A8ECCC");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.needsUpdate = true;
      return tex;
    }
    const bgTexture = createMintGradientTexture();
    const bgMaterial = new THREE.MeshBasicMaterial({
      map: bgTexture,
      depthWrite: false,
    });
    const bgGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    bgMesh.position.z = -1; // behind particles
    // scene.add(bgMesh);

    let bgWidth = 0;
    let bgHeight = 0;
    const updateBackgroundScale = () => {
      const dist = camera.position.z - bgMesh.position.z;
      const height =
        2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * dist;
      const width = height * camera.aspect;
      bgWidth = width;
      bgHeight = height;
      bgMesh.scale.set(width, height, 1);
    };
    updateBackgroundScale();

    const leafSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><g fill='none' stroke='%2337a169' stroke-width='2'><path d='M10 42c12-2 22-8 30-16 4-4 8-10 12-18-6 2-12 6-16 10C28 26 22 36 20 48'/><path d='M20 48c-8-2-12-8-10-14s8-10 14-8c6 2 10 8 8 14-2 6-8 10-12 8z' fill='%2393e9be'/></g></svg>`;
    const leafUrl = `data:image/svg+xml;utf8,${encodeURIComponent(leafSvg)}`;
    const leafTexture = new THREE.TextureLoader().load(leafUrl);
    leafTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const leafCount = window.innerWidth < 768 ? 16 : 28;
    const leaves: THREE.Sprite[] = [];
    const leafVelocities: Array<{ vx: number; vy: number; rot: number }> = [];
    for (let i = 0; i < leafCount; i++) {
      const mat = new THREE.SpriteMaterial({
        map: leafTexture,
        transparent: true,
        depthWrite: false,
        opacity: 0.9,
      });
      const sprite = new THREE.Sprite(mat);
      const base = window.innerWidth < 768 ? 0.8 : 1.2;
      const scale = base + Math.random() * 0.8;
      sprite.scale.set(scale, scale, 1);
      sprite.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        -0.3
      );
      leaves.push(sprite);
      leafVelocities.push({
        vx: (Math.random() - 0.5) * 0.02,
        vy: 0.02 + Math.random() * 0.02,
        rot: (Math.random() - 0.5) * 0.01,
      });
      scene.add(sprite);
    }

    const particlesCnt: number = window.innerWidth < 768 ? 3000 : 8000;
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
      // Animate leaves gentle floating
      for (let i = 0; i < leaves.length; i++) {
        const s = leaves[i];
        const v = leafVelocities[i];
        s.position.x += v.vx;
        s.position.y += v.vy * 0.016;
        (s.material as THREE.SpriteMaterial).rotation += v.rot;
        const halfW = bgWidth / 2 + 1;
        const halfH = bgHeight / 2 + 1;
        if (s.position.y > halfH) s.position.y = -halfH;
        if (s.position.y < -halfH) s.position.y = halfH;
        if (s.position.x > halfW) s.position.x = -halfW;
        if (s.position.x < -halfW) s.position.x = halfW;
      }
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
      updateBackgroundScale();
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
      bgTexture.dispose();
      bgMaterial.dispose();
      leaves.forEach((s) => {
        (s.material as THREE.SpriteMaterial).dispose();
        scene.remove(s);
      });
      renderer.dispose();
    });
  });

  return (
    <header class="relative h-screen overflow-hidden">
      <canvas
        id="threejs-canvas"
        class="absolute inset-0 w-full h-full -z-10 pointer-events-none"
      ></canvas>

      <nav class="absolute top-0 left-0 right-0 z-20">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between relative">
          <a
            href="#"
            class="text-2xl font-extrabold tracking-tight"
            style="color: #8E9375;"
          >
            کافه نعنا
          </a>
          <div
            class="hidden md:flex items-center gap-6"
            style="color: #8E9375;"
          >
            <ul class="flex items-center gap-6">
              <li>
                <a href="#about" class="hover:text-green-950">
                  درباره ما
                </a>
              </li>
              <li>
                <a href="#menu" class="hover:text-green-950">
                  منو
                </a>
              </li>
              <li>
                <a href="#contact" class="hover:text-green-950">
                  تماس
                </a>
              </li>
            </ul>
            <div class="w-px h-6 bg-white/30"></div>
            <div class="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                class="hover:text-green-950"
                aria-label="Instagram"
              >
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm11 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener"
                class="hover:text-green-950"
                aria-label="Telegram"
              >
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9.04 15.72 8.9 20a1 1 0 0 0 1.62.78l2.33-1.85 4.83 3.52a1 1 0 0 0 1.56-.62l3.7-16.05a1 1 0 0 0-1.37-1.15L1.5 10.06a1 1 0 0 0 .06 1.88l6.2 2.18 10.24-9.16-8.96 10.76z" />
                </svg>
              </a>
              <a
                href="https://wa.me/989123456789"
                target="_blank"
                rel="noopener"
                class="hover:text-green-950"
                aria-label="WhatsApp"
              >
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.01 0C5.38 0 .01 5.37.01 11.99c0 2.11.55 4.19 1.6 6.02L0 24l6.14-1.6a12 12 0 0 0 5.86 1.5h.01c6.63 0 12-5.37 12-11.99 0-3.2-1.25-6.21-3.49-8.43zM12 21.06h-.01a9.95 9.95 0 0 1-5.06-1.39l-.36-.21-3.64.95.97-3.55-.23-.37A9.94 9.94 0 1 1 22 12.01c0 5.48-4.46 9.94-10 9.94zm5.73-7.46c-.31-.16-1.84-.9-2.13-1s-.5-.16-.72.16-.82 1-.99 1.2-.36.24-.67.08-1.31-.48-2.5-1.52c-.92-.82-1.54-1.84-1.72-2.15s0-.48.15-.64c.15-.16.34-.4.5-.6.16-.2.21-.36.32-.6.1-.24.05-.44-.03-.6-.08-.16-.72-1.73-.98-2.37-.26-.64-.52-.55-.72-.56l-.62-.01c-.2 0-.52.08-.8.36s-1.05 1.03-1.05 2.5 1.08 2.9 1.24 3.1c.15.2 2.13 3.25 5.17 4.56.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.28-.2-.59-.36z" />
                </svg>
              </a>
            </div>
          </div>
          <button
            type="button"
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:text-green-950 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            style="color: #8E9375;"
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
              class="md:hidden absolute top-full right-4 left-4 bg-white/90 backdrop-blur rounded-xl shadow-lg p-4 mt-2 space-y-2"
              style="color: #8E9375;"
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
                  href="#contact"
                  class="block px-3 py-2 rounded hover:bg-green-50"
                  onClick={() => setIsMobileOpen(false)}
                >
                  تماس
                </a>
              </li>
              <li class="pt-2 mt-2 border-t border-green-100">
                <div class="flex justify-center gap-6">
                  <a
                    href="https://instagram.com/minttcoffee"
                    target="_blank"
                    rel="noopener"
                    aria-label="Instagram"
                  >
                    <svg
                      class="w-6 h-6"
                      style="color: #8E9375;"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm11 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                    </svg>
                  </a>
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noopener"
                    aria-label="Telegram"
                  >
                    <svg
                      class="w-6 h-6"
                      style="color: #8E9375;"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M9.04 15.72 8.9 20a1 1 0 0 0 1.62.78l2.33-1.85 4.83 3.52a1 1 0 0 0 1.56-.62l3.7-16.05a1 1 0 0 0-1.37-1.15L1.5 10.06a1 1 0 0 0 .06 1.88l6.2 2.18 10.24-9.16-8.96 10.76z" />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <div
        class="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10"
        style="color: #8E9375;"
      >
        <img src={Logo} alt="Mint Cafe Logo" class="max-w-64 animate-bounce" />
        <h1 class="text-5xl md:text-7xl font-extrabold fade-in">کافه نعنا</h1>
        <p class="text-xl md:text-2xl mt-4 fade-in">
          طعم طبیعت، آرامش بی‌نهایت
        </p>
        <a
          href="#menu"
          class="mt-6 px-8 py-3 text-white rounded-full font-semibold hover-scale"
          style="background-color: #8E9375;"
        >
          مشاهده منو
        </a>
        <div class="mt-6 relative inline-block">
          <button
            id="order-button"
            class="px-8 py-3 hover:from-cyan-800 text-white rounded-full font-semibold cursor-pointer hover-scale animate-mint-pulse shadow-lg"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-controls="dropdown-menu"
            style="background-color: #8E9375;"
          >
            سفارش آنلاین
          </button>
          <div
            id="dropdown-menu"
            class="dropdown-menu hidden absolute right-0 top-full mt-2 md:right-full md:top-0 md:mt-0 md:mr-4 bg-white p-4 rounded-lg shadow-xl flex flex-col space-y-2 min-w-max"
            style="color: #8E9375;"
            role="menu"
          >
            <a
              href="https://superapp.snappfood.ir/caffe/menu/%DA%A9%D8%A7%D9%81%D9%87_%D9%86%D8%B9%D9%86%D8%A7-r-e5qgr5/"
              class="hover:underline hover:text-green-900 transition"
            >
              سفارش از اسنپ فود
            </a>
            <a
              href="https://tapsi.food/vendor/594rn6"
              class="hover:underline hover:text-green-900 transition"
            >
              سفارش از تپسی فود
            </a>
          </div>
        </div>
        <div class="pt-2 mt-2 border-t border-green-100">
          <div class="flex items-center gap-3">
            <a
              href="https://instagram.com/minttcoffee"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
            >
              <svg
                class="w-7 h-7"
                style="color: #8E9375;"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm11 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener"
              aria-label="Telegram"
            >
              <svg
                class="w-7 h-7"
                style="color: #8E9375;"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M9.04 15.72 8.9 20a1 1 0 0 0 1.62.78l2.33-1.85 4.83 3.52a1 1 0 0 0 1.56-.62l3.7-16.05a1 1 0 0 0-1.37-1.15L1.5 10.06a1 1 0 0 0 .06 1.88l6.2 2.18 10.24-9.16-8.96 10.76z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
