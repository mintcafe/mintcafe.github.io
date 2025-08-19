import { Component } from "solid-js";

const Contact: Component = () => {
	return (
		<section id="contact" class="container mx-auto py-16 px-4 md:px-8">
			<h2 class="text-4xl font-extrabold text-green-900 text-center section-title">تماس با ما</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-10 items-stretch">
				<div class="bg-white/80 backdrop-blur rounded-2xl shadow-md p-6 flex flex-col gap-3">
					<p class="text-gray-700"><span class="font-bold text-green-800">آدرس:</span> تهران، خیابان مثال، پلاک ۱۲۳</p>
					<p class="text-gray-700"><span class="font-bold text-green-800">ساعت کاری:</span> همه روزه ۹ تا ۲۲</p>
					<p class="text-gray-700"><span class="font-bold text-green-800">تلفن:</span> <a class="text-green-700 hover:text-green-900" href="tel:+989123456789">0912 345 6789</a></p>
					<div class="flex gap-4 mt-2">
						<a href="https://instagram.com" target="_blank" rel="noopener" class="text-green-700 hover:text-green-900">اینستاگرام</a>
						<a href="https://t.me" target="_blank" rel="noopener" class="text-green-700 hover:text-green-900">تلگرام</a>
					</div>
				</div>
				<div class="rounded-2xl overflow-hidden shadow-md min-h-64">
					<iframe title="map" class="w-full h-64 sm:h-full min-h-64" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.123!2d51.389!3d35.689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z2KfZiNix2KfZhiA!5e0!3m2!1sfa!2sir!4v1700000000000"></iframe>
				</div>
			</div>
		</section>
	);
};

export default Contact;


