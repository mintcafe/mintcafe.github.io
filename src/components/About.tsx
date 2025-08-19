import { Component } from "solid-js";

const About: Component = () => {
  return (
    <section id="about" class="container mx-auto py-16 px-4 md:px-8">
      <h2 class="text-4xl font-extrabold text-green-900 text-center section-title">
        درباره کافه نعنا
      </h2>
      <p class="mt-6 text-lg text-gray-700 text-center max-w-3xl mx-auto">
        در کافه نعناع، هر فنجان روایت‌گر آرامش و طراوت است. ما با استفاده از
        مواد اولیه‌ی تازه و ترکیب‌های خلاقانه، تجربه‌ای دلنشین از نوشیدنی‌ها و
        دسرها را برای شما فراهم می‌کنیم.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-10">
        <div class="bg-white/80 backdrop-blur rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 class="text-xl font-bold text-green-800">مواد اولیه تازه</h3>
          <p class="mt-2 text-gray-600">
            از نعناع تازه تا دانه‌های منتخب قهوه، کیفیت برای ما اولویت است.
          </p>
        </div>
        <div class="bg-white/80 backdrop-blur rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 class="text-xl font-bold text-green-800">محیط دلنشین</h3>
          <p class="mt-2 text-gray-600">
            طراحی آرام‌بخش با ترکیب رنگ‌های ملایم برای ساعات خوش کنار دوستان.
          </p>
        </div>
        <div class="bg-white/80 backdrop-blur rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 class="text-xl font-bold text-green-800">سفارش آنلاین</h3>
          <p class="mt-2 text-gray-600">
            به راحتی از اسنپ‌فود یا تپسی‌فود سفارش دهید و لذت ببرید.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
