import { Component, createSignal, For } from "solid-js";
import menuData from "../data/menu.json";

// Map all images in assets/items to URLs so filenames in JSON resolve at runtime
const itemImageModules = import.meta.glob("../assets/items/*", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const resolveItemImageUrl = (filename: string): string | undefined => {
  if (!filename) return undefined;
  const match = Object.entries(itemImageModules).find(([path]) =>
    path.endsWith(`/${filename}`)
  );
  return match ? match[1] : undefined;
};

type MenuItem = { title: string; description: string; image: string };

const Menu: Component = () => {
  const [activeTab, setActiveTab] = createSignal<
    "breakfast" | "hotcoffee" | "hot" | "ice" | "shake" | "cake"
  >("breakfast");

  return (
    <section id="menu" class="container mx-auto py-16 px-4 md:px-8">
      <h2 class="text-4xl font-extrabold text-green-900 text-center section-title">
        منوی کافه
      </h2>
      <div class="tabs mt-8 overflow-x-auto">
        <ul class="flex gap-4 md:gap-6 flex-nowrap md:flex-wrap whitespace-nowrap md:whitespace-normal justify-start md:justify-center">
          <li>
            <button
              type="button"
              class={`tab-link text-base md:text-lg font-semibold ${
                activeTab() === "breakfast"
                  ? "active text-green-800"
                  : "text-green-700 hover:text-green-900"
              }`}
              aria-selected={activeTab() === "breakfast"}
              onClick={() => setActiveTab("breakfast")}
            >
              صبحانه
            </button>
          </li>
          <li>
            <button
              type="button"
              class={`tab-link text-base md:text-lg font-semibold ${
                activeTab() === "hotcoffee"
                  ? "active text-green-800"
                  : "text-green-700 hover:text-green-900"
              }`}
              aria-selected={activeTab() === "hotcoffee"}
              onClick={() => setActiveTab("hotcoffee")}
            >
              نوشیدنی‌های گرم بر پایه قهوه
            </button>
          </li>
          <li>
            <button
              type="button"
              class={`tab-link text-base md:text-lg font-semibold ${
                activeTab() === "hot"
                  ? "active text-green-800"
                  : "text-green-700 hover:text-green-900"
              }`}
              aria-selected={activeTab() === "hot"}
              onClick={() => setActiveTab("hot")}
            >
              نوشیدنی‌های گرم
            </button>
          </li>
          <li>
            <button
              type="button"
              class={`tab-link text-base md:text-lg font-semibold ${
                activeTab() === "ice"
                  ? "active text-green-800"
                  : "text-green-700 hover:text-green-900"
              }`}
              aria-selected={activeTab() === "ice"}
              onClick={() => setActiveTab("ice")}
            >
              نوشیدنی‌های سرد
            </button>
          </li>
          <li>
            <button
              type="button"
              class={`tab-link text-base md:text-lg font-semibold ${
                activeTab() === "shake"
                  ? "active text-green-800"
                  : "text-green-700 hover:text-green-900"
              }`}
              aria-selected={activeTab() === "shake"}
              onClick={() => setActiveTab("shake")}
            >
              شیک ها و ماکتیل ها
            </button>
          </li>
          <li>
            <button
              type="button"
              class={`tab-link text-base md:text-lg font-semibold ${
                activeTab() === "cake"
                  ? "active text-green-800"
                  : "text-green-700 hover:text-green-900"
              }`}
              aria-selected={activeTab() === "cake"}
              onClick={() => setActiveTab("cake")}
            >
              کیک
            </button>
          </li>
        </ul>
      </div>
      <div
        id="hot-drinks"
        class={`${activeTab() === "breakfast" ? "" : "hidden"} tab-content`}
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <For each={menuData.breakfast as MenuItem[]}>
            {(item) => (
              <div class="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                {resolveItemImageUrl(item.image) && (
                  <img
                    src={resolveItemImageUrl(item.image)}
                    alt={item.title}
                    class="w-full h-40 object-cover rounded-xl mb-4"
                    loading="lazy"
                  />
                )}
                <h3 class="text-xl font-bold text-green-900">{item.title}</h3>
                <p class="text-gray-600 mt-1">{item.description}</p>
              </div>
            )}
          </For>
        </div>
      </div>
      <div
        id="hot-drinks"
        class={`${activeTab() === "hotcoffee" ? "" : "hidden"} tab-content`}
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <For each={menuData.hotcoffee as MenuItem[]}>
            {(item) => (
              <div class="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                {resolveItemImageUrl(item.image) && (
                  <img
                    src={resolveItemImageUrl(item.image)}
                    alt={item.title}
                    class="w-full h-40 object-cover rounded-xl mb-4"
                    loading="lazy"
                  />
                )}
                <h3 class="text-xl font-bold text-green-900">{item.title}</h3>
                <p class="text-gray-600 mt-1">{item.description}</p>
              </div>
            )}
          </For>
        </div>
      </div>
      <div
        id="hot-drinks"
        class={`${activeTab() === "hot" ? "" : "hidden"} tab-content`}
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <For each={menuData.hot as MenuItem[]}>
            {(item) => (
              <div class="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                {resolveItemImageUrl(item.image) && (
                  <img
                    src={resolveItemImageUrl(item.image)}
                    alt={item.title}
                    class="w-full h-40 object-cover rounded-xl mb-4"
                    loading="lazy"
                  />
                )}
                <h3 class="text-xl font-bold text-green-900">{item.title}</h3>
                <p class="text-gray-600 mt-1">{item.description}</p>
              </div>
            )}
          </For>
        </div>
      </div>
      <div
        id="hot-drinks"
        class={`${activeTab() === "ice" ? "" : "hidden"} tab-content`}
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <For each={menuData.ice as MenuItem[]}>
            {(item) => (
              <div class="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                {resolveItemImageUrl(item.image) && (
                  <img
                    src={resolveItemImageUrl(item.image)}
                    alt={item.title}
                    class="w-full h-40 object-cover rounded-xl mb-4"
                    loading="lazy"
                  />
                )}
                <h3 class="text-xl font-bold text-green-900">{item.title}</h3>
                <p class="text-gray-600 mt-1">{item.description}</p>
              </div>
            )}
          </For>
        </div>
      </div>
      <div
        id="hot-drinks"
        class={`${activeTab() === "shake" ? "" : "hidden"} tab-content`}
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <For each={menuData.shake as MenuItem[]}>
            {(item) => (
              <div class="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                {resolveItemImageUrl(item.image) && (
                  <img
                    src={resolveItemImageUrl(item.image)}
                    alt={item.title}
                    class="w-full h-40 object-cover rounded-xl mb-4"
                    loading="lazy"
                  />
                )}
                <h3 class="text-xl font-bold text-green-900">{item.title}</h3>
                <p class="text-gray-600 mt-1">{item.description}</p>
              </div>
            )}
          </For>
        </div>
      </div>
      <div
        id="desserts"
        class={`${activeTab() === "cake" ? "" : "hidden"} tab-content`}
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <For each={menuData.cake as MenuItem[]}>
            {(item) => (
              <div class="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                {resolveItemImageUrl(item.image) && (
                  <img
                    src={resolveItemImageUrl(item.image)}
                    alt={item.title}
                    class="w-full h-40 object-cover rounded-xl mb-4"
                    loading="lazy"
                  />
                )}
                <h3 class="text-xl font-bold text-green-900">{item.title}</h3>
                <p class="text-gray-600 mt-1">{item.description}</p>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
};

export default Menu;
