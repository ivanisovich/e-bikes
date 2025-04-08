<template>
  <div class="py-16">
    <div class="container">
      <h1 class="section-title">Каталог электровелосипедов</h1>

      <!-- Filters -->
      <div class="bg-gray-900 p-6 rounded-lg mb-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label class="block text-sm font-medium mb-2">Категория</label>
            <select v-model="filters.category"
              class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Все категории</option>
              <option value="urban">Городские</option>
              <option value="sport">Спортивные</option>
              <option value="cargo">Грузовые</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Цвет</label>
            <select v-model="filters.color"
              class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Все цвета</option>
              <option value="white">Белый</option>
              <option value="black">Черный</option>
              <option value="green">Зеленый</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Цена</label>
            <select v-model="filters.price"
              class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Любая цена</option>
              <option value="low">До 150 000 ₸</option>
              <option value="medium">150 000 - 200 000 ₸</option>
              <option value="high">Свыше 200 000 ₸</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Сортировка</label>
            <select v-model="sorting"
              class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="popular">По популярности</option>
              <option value="price_asc">По цене (возрастание)</option>
              <option value="price_desc">По цене (убывание)</option>
              <option value="new">Новинки</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="product in filteredProducts" :key="product.id" class="bg-gray-900 rounded-lg overflow-hidden group">
          <div :key="product.id" class="bg-gray-900 rounded-lg overflow-hidden group">
            <div class="relative overflow-hidden">
              <img :src="product.images[0]" :alt="product.name"
                class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div class="p-4">
                  <router-link :to="`/catalog/${product.id}`" class="btn btn-primary text-sm py-2">
                    Подробнее
                  </router-link>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">{{ product.name }}</h3>
              <p class="text-sm text-gray-400 mb-4">{{ product.description }}</p>
              <div class="flex justify-between items-center">
                <p class="text-green-400 font-bold">{{ product.price }} ₸</p>
                <button @click="addToCart(product)" class="btn btn-outline text-sm py-1 px-3">
                  В корзину
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredProducts.length === 0" class="text-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-bold mb-2">Ничего не найдено</h3>
          <p class="text-gray-400 mb-6">Попробуйте изменить параметры фильтрации</p>
          <button @click="resetFilters" class="btn btn-primary">Сбросить фильтры</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed,onMounted } from 'vue';

const filters = ref({
  category: '',
  color: '',
  price: ''
});

const sorting = ref('popular');

const products = ref([]);

const featuredProducts = ref([]);


onMounted(async () => {
  try {
    const response = await fetch('http://138.68.93.210/products');
    if (response.ok) {
      products.value = await response.json();
    }
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
  }
});

const filteredProducts = computed(() => {
  let result = [...products.value];

  // Apply category filter
  if (filters.value.category) {
    result = result.filter(product => product.category === filters.value.category);
  }

  // Apply color filter
  if (filters.value.color) {
    result = result.filter(product => product.color === filters.value.color);
  }

  // Apply price filter
  if (filters.value.price) {
    switch (filters.value.price) {
      case 'low':
        result = result.filter(product => product.priceValue < 150000);
        break;
      case 'medium':
        result = result.filter(product => product.priceValue >= 150000 && product.priceValue <= 200000);
        break;
      case 'high':
        result = result.filter(product => product.priceValue > 200000);
        break;
    }
  }

  // Apply sorting
  switch (sorting.value) {
    case 'popular':
      result.sort((a, b) => b.popular - a.popular);
      break;
    case 'price_asc':
      result.sort((a, b) => a.priceValue - b.priceValue);
      break;
    case 'price_desc':
      result.sort((a, b) => b.priceValue - a.priceValue);
      break;
    case 'new':
      result.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return b.popular - a.popular;
      });
      break;
  }

  return result;
});

function resetFilters() {
  filters.value = {
    category: '',
    color: '',
    price: ''
  };
  sorting.value = 'popular';
}

function addToCart(product) {
  // This would typically interact with a cart store
  alert(`Товар "${product.name}" добавлен в корзину`);
}
</script>