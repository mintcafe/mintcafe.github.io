import { Component, createSignal, For } from "solid-js";
import menuData from "../data/menu.json";

type MenuItem = { title: string; description: string };

const Menu: Component = () => {
  const [activeTab, setActiveTab] = createSignal<"hot" | "desserts">("hot");

  return (
    <section id="menu" class="container mx-auto py-16 px-4 md:px-8">
      <h2 class="text-4xl font-extrabold text-green-900 text-center section-title">
        منوی کافه
      </h2>
      <div class="tabs mt-8">
        <ul class="flex justify-center gap-6">
          <li>
            <button
              type="button"
              class={`tab-link text-lg font-semibold ${
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
              class={`tab-link text-lg font-semibold ${
                activeTab() === "desserts"
                  ? "active text-green-800"
                  : "text-green-700 hover:text-green-900"
              }`}
              aria-selected={activeTab() === "desserts"}
              onClick={() => setActiveTab("desserts")}
            >
              دسرها
            </button>
          </li>
        </ul>
      </div>
      <div
        id="hot-drinks"
        class={`${activeTab() === "hot" ? "" : "hidden"} tab-content`}
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <For each={menuData.hot as MenuItem[]}>
            {(item) => (
              <div class="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <h3 class="text-xl font-bold text-green-900">{item.title}</h3>
                <p class="text-gray-600 mt-1">{item.description}</p>
              </div>
            )}
          </For>
        </div>
      </div>
      <div
        id="desserts"
        class={`${activeTab() === "desserts" ? "" : "hidden"} tab-content`}
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <For each={menuData.desserts as MenuItem[]}>
            {(item) => (
              <div class="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md hover:shadow-lg transition">
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
