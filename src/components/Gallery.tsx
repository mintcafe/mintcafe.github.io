import { Component } from "solid-js";

const tiles = [
  {
    title: "لاته نعنا",
    emoji: "🥤",
    gradient: "from-emerald-200 to-green-100",
  },
  { title: "چای سبز", emoji: "🍵", gradient: "from-green-200 to-emerald-100" },
  { title: "کیک شکلاتی", emoji: "🍰", gradient: "from-lime-200 to-green-100" },
  { title: "اسپرسو", emoji: "☕", gradient: "from-emerald-300 to-green-200" },
  { title: "موکا", emoji: "🍫", gradient: "from-green-300 to-lime-200" },
  { title: "لیموناد", emoji: "🍋", gradient: "from-lime-300 to-emerald-200" },
];

const Gallery: Component = () => {
  return (
    <section id="gallery" class="container mx-auto py-16 px-4 md:px-8">
      <h2 class="text-4xl font-extrabold text-green-900 text-center section-title">
        گالری
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-10">
        {tiles.map((t) => (
          <div
            class={`rounded-2xl p-6 bg-gradient-to-br ${t.gradient} shadow-sm hover:shadow-md transition transform hover:-translate-y-1`}
          >
            <div class="text-4xl">{t.emoji}</div>
            <div class="mt-3 text-green-900 font-semibold">{t.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
