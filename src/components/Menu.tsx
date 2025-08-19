import { Component, onCleanup, onMount } from "solid-js";

const Menu: Component = () => {
  onMount(() => {
    const tabs: NodeListOf<HTMLAnchorElement> =
      document.querySelectorAll(".tabs ul li a");
    const contents: NodeListOf<HTMLElement> =
      document.querySelectorAll(".tab-content");

    const onTabClick =
      (tab: HTMLAnchorElement) =>
      (e: Event): void => {
        e.preventDefault();
        tabs.forEach((t: HTMLAnchorElement): void =>
          t.classList.remove("active")
        );
        tab.classList.add("active");
        contents.forEach((c: HTMLElement): void => c.classList.add("hidden"));
        const targetSelector = tab.getAttribute("href");
        if (!targetSelector) return;
        const target: HTMLElement | null =
          document.querySelector(targetSelector);
        target?.classList.remove("hidden");
      };

    tabs.forEach((tab: HTMLAnchorElement): void => {
      tab.addEventListener("click", onTabClick(tab));
    });

    onCleanup(() => {
      tabs.forEach((tab: HTMLAnchorElement): void => {
        tab.replaceWith(tab.cloneNode(true));
      });
    });
  });

  return (
    <section id="menu" class="container mx-auto py-12">
      <h2 class="text-4xl font-bold text-center mb-8">منوی کافه</h2>
      <div class="tabs">
        <ul class="flex justify-center space-x-4">
          <li>
            <a
              href="#hot-drinks"
              class="tab-link text-lg font-semibold text-green-700 hover:text-green-900 active"
            >
              نوشیدنی‌های گرم
            </a>
          </li>
          <li>
            <a
              href="#desserts"
              class="tab-link text-lg font-semibold text-green-700 hover:text-green-900"
            >
              دسرها
            </a>
          </li>
        </ul>
      </div>
      <div id="hot-drinks" class="tab-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold">اسپرسو</h3>
            <p class="text-gray-600">قهوه غلیظ با عطر بی‌نظیر</p>
            <p class="text-green-700 font-bold mt-2">60,000 تومان</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold">لاته نعناع</h3>
            <p class="text-gray-600">شیر گرم با طعم نعناع تازه</p>
            <p class="text-green-700 font-bold mt-2">75,000 تومان</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold">چای سبز</h3>
            <p class="text-gray-600">چای سبز طبیعی با عطر لیمو</p>
            <p class="text-green-700 font-bold mt-2">45,000 تومان</p>
          </div>
        </div>
      </div>
      <div id="desserts" class="tab-content hidden">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold">کیک نعناع</h3>
            <p class="text-gray-600">کیک خانگی با طعم نعناع و شکلات</p>
            <p class="text-green-700 font-bold mt-2">50,000 تومان</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
