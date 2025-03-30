<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-r from-black to-black/20"></div>
        <img src="../assets/photo.png" alt="E-BIKE" class="w-full h-full object-cover object-center" />
      </div>
      
      <div class="container relative z-10">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Будущее городской мобильности
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-gray-300">
            Электровелосипеды с минималистичным дизайном и передовыми технологиями
          </p>
          <div class="flex flex-wrap gap-4">
            <router-link to="/catalog" class="btn btn-primary">
              Смотреть каталог
            </router-link>
            <router-link to="/service" class="btn btn-outline">
              Техническое обслуживание
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20">
      <div class="container">
        <h2 class="section-title text-center">Преимущества наших электровелосипедов</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          <div class="bg-gray-900 p-8 rounded-lg">
            <div class="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">Мощный двигатель</h3>
            <p class="text-gray-400">
              Mid-mounted мотор с оптимизированной плотностью крутящего момента для максимальной эффективности.
            </p>
          </div>
          
          <div class="bg-gray-900 p-8 rounded-lg">
            <div class="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">Долгий заряд</h3>
            <p class="text-gray-400">
              Аккумулятор 360Wh обеспечивает длительную поездку без подзарядки в городских условиях.
            </p>
          </div>
          
          <div class="bg-gray-900 p-8 rounded-lg">
            <div class="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">Минималистичный дизайн</h3>
            <p class="text-gray-400">
              Чистые линии, матовые текстуры и продуманные пропорции создают уникальный современный вид.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 bg-gray-950">
      <div class="container">
        <h2 class="section-title">Популярные модели</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="product in featuredProducts" :key="product.id" class="bg-gray-900 rounded-lg overflow-hidden group">
            <div class="relative overflow-hidden">
              <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div class="p-4">
                  <router-link :to="`/catalog/${product.id}`" class="btn btn-primary text-sm py-2">
                    Подробнее
                  </router-link>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">{{ product.name }}</h3>
              <div class="flex justify-between items-center">
                <p class="text-green-400 font-bold">{{ product.price }} ₽</p>
                <div class="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {{ product.rating }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <router-link to="/catalog" class="btn btn-outline">
            Смотреть все модели
          </router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20">
      <div class="container">
        <h2 class="section-title text-center">Отзывы наших клиентов</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="bg-gray-900 p-8 rounded-lg">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold mr-4">
                {{ testimonial.name.charAt(0) }}
              </div>
              <div>
                <h4 class="font-bold">{{ testimonial.name }}</h4>
                <p class="text-gray-400 text-sm">{{ testimonial.location }}</p>
              </div>
            </div>
            <p class="text-gray-300">{{ testimonial.text }}</p>
            <div class="flex mt-4">
              <div v-for="i in 5" :key="i" class="text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" :fill="i <= testimonial.rating ? 'currentColor' : 'none'" :stroke="i <= testimonial.rating ? 'none' : 'currentColor'">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-green-500 p-4 text-black">
      <div class="container">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="mb-8 md:mb-0 md:mr-8">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Готовы к новому опыту?</h2>
            <p class="text-xl  max-w-xl">Запишитесь на тест-драйв и испытайте наши электровелосипеды в действии</p>
          </div>
          <router-link to="/contacts" class="btn p-2 bg-black text-white hover:bg-gray-800">
            Записаться на тест-драйв
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import img1 from "../assets/img1.png"
import img2 from "../assets/img1.png"
import img3 from "../assets/img1.png"
const featuredProducts = ref([
  {
    id: 1,
    name: 'E-BIKES Urban',
    price: '149 900',
    rating: 4.8,
    image: img1  },
  {
    id: 2,
    name: 'E-BIKES Sport',
    price: '189 900',
    rating: 4.9,
    image: img2  },
  {
    id: 3,
    name: 'E-BIKES Cargo',
    price: '219 900',
    rating: 4.7,
    image: img3  }
]);

const testimonials = ref([
  {
    name: 'Алексей',
    location: 'Москва',
    rating: 5,
    text: 'Отличный электровелосипед! Минималистичный дизайн привлекает внимание, а батареи хватает на весь день поездок по городу.'
  },
  {
    name: 'Елена',
    location: 'Санкт-Петербург',
    rating: 4,
    text: 'Очень довольна покупкой. Легкий, маневренный и стильный. Единственный минус - хотелось бы больше вариантов цветов.'
  },
  {
    name: 'Дмитрий',
    location: 'Екатеринбург',
    rating: 5,
    text: 'Использую для ежедневных поездок на работу. Экономит время и деньги, а сервисное обслуживание на высшем уровне.'
  }
]);
</script>