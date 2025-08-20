import { Component } from "solid-js";

const Contact: Component = () => {
  return (
    <section id="contact" class="container mx-auto py-16 px-4 md:px-8">
      <h2 class="text-4xl font-extrabold text-green-900 text-center section-title">
        تماس با ما
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-10 items-stretch">
        <div class="bg-white/80 backdrop-blur rounded-2xl shadow-md p-6 flex flex-col gap-3">
          <p class="text-gray-700">
            <span class="font-bold text-green-800">آدرس: </span>
            تهران، خیابان شادمهر، نرسیده به آزادی، پلاک 42، کافه نعنا
          </p>
          <p class="text-gray-700">
            <span class="font-bold text-green-800">ساعت کاری:</span> همه روزه 7
            تا 22
          </p>
          <p class="text-gray-700">
            <span class="font-bold text-green-800">تلفن:</span>{" "}
            <a
              class="text-green-700 hover:text-green-900"
              href="tel:+989125667376"
            >
              09125667376
            </a>
          </p>
          <div class="flex gap-4 mt-2">
            <a
              href="https://instagram.com/minttcoffee"
              target="_blank"
              rel="noopener"
              class="text-green-700 hover:text-green-900"
            >
              اینستاگرام
            </a>
            <a
              href="https://t.me/mintplaylist"
              target="_blank"
              rel="noopener"
              class="text-green-700 hover:text-green-900"
            >
              تلگرام
            </a>
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden shadow-md min-h-64">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d202.49904987266135!2d51.36292869641623!3d35.70199170651723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1755600065601!5m2!1sen!2s"
            title="map"
            class="w-full h-64 sm:h-full min-h-64"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
