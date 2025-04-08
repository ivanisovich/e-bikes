<template>
    <div class="p-6">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Список товаров</h1>
        <router-link to="/admin/add" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Добавить товар</router-link>
      </div>
      <!-- Фильтры -->
      <div class="flex flex-wrap gap-4 mb-6">
        <input v-model="filters.name" type="text" placeholder="Фильтр по названию" class="border px-3 py-2 rounded">
        <select v-model="filters.category" class="border px-3 py-2 rounded">
          <option value="">Все категории</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <button @click="resetFilters" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Сбросить</button>
      </div>
      <table class="min-w-full  shadow rounded-lg overflow-hidden">
        <thead class="bg-gray-200">
          <tr>
            <th class="py-3 px-4 text-left">Название</th>
            <th class="py-3 px-4 text-left">Описание</th>
            <th class="py-3 px-4 text-left">Цена</th>
            <th class="py-3 px-4 text-left">Категория</th>
            <th class="py-3 px-4 text-left">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id" class="border-b hover:bg-gray-50">
            <td class="py-3 px-4">{{ product.name }}</td>
            <td class="py-3 px-4">{{ product.description }}</td>
            <td class="py-3 px-4">{{ product.price }} ₽</td>
            <td class="py-3 px-4">{{ product.category }}</td>
            <td class="py-3 px-4 space-x-2">
              <router-link :to="`/admin/edit/${product.id}`" class="text-blue-500 hover:underline">Редактировать</router-link>
              <button @click="deleteProduct(product.id)" class="text-red-500 hover:underline">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const products = ref([]);
  const categories = ref([]);
  const filters = ref({
    name: '',
    category: ''
  });
  
  async function fetchProducts() {
    try {
      const res = await fetch('http://138.68.93.210/products');
      if (res.ok) {
        products.value = await res.json();
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  async function fetchCategories() {
    try {
      const res = await fetch('http://138.68.93.210/categories');
      if (res.ok) {
        categories.value = await res.json();
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  onMounted(() => {
    fetchProducts();
    fetchCategories();
  });
  
  const filteredProducts = computed(() => {
    return products.value.filter(p => {
      const matchName = p.name.toLowerCase().includes(filters.value.name.toLowerCase());
      const matchCategory = filters.value.category ? p.category === filters.value.category : true;
      return matchName && matchCategory;
    });
  });
  
  function resetFilters() {
    filters.value.name = '';
    filters.value.category = '';
  }
  
  async function deleteProduct(id) {
    try {
      const res = await fetch(`http://138.68.93.210/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        products.value = products.value.filter(p => p.id !== id);
      }
    } catch (error) {
      console.error(error);
    }
  }
  </script>
  
  <style scoped>
  /* Дополнительные стили по необходимости */
  </style>
  