<template>
    <div v-if="form" class="p-6 max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">Редактировать товар</h1>
      <form @submit.prevent="submitForm" class=" p-6 rounded shadow">
        <div class="mb-4">
          <label class="block text-gray-700">Название:</label>
          <input v-model="form.name" type="text" required class="w-full border px-3 py-2 rounded">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Описание:</label>
          <textarea v-model="form.description" required class="w-full border px-3 py-2 rounded"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Цена (₽):</label>
          <input v-model="form.price" type="number" step="0.01" required class="w-full border px-3 py-2 rounded">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Фото (ссылки, по одной на строку):</label>
          <textarea v-model="form.images" required class="w-full border px-3 py-2 rounded"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Технические характеристики (каждая строка «Ключ: Значение»):</label>
          <textarea v-model="form.specifications" class="w-full border px-3 py-2 rounded"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Категория (выберите):</label>
          <select v-model="form.existingCategory" class="w-full border px-3 py-2 rounded">
            <option value="">-- Выберите категорию --</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700">Или создайте новую:</label>
          <input v-model="form.newCategory" type="text" placeholder="Новая категория" class="w-full border px-3 py-2 rounded">
        </div>
        <button type="submit" class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Сохранить изменения</button>
      </form>
    </div>
    <div v-else class="text-center p-6">
      Загрузка товара...
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const categories = ref([]);
  
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
  fetchCategories();
  
  const form = ref(null);
  
  async function fetchProduct() {
    try {
      const res = await fetch(`http://138.68.93.210/products/${route.params.id}`);
      if (res.ok) {
        const product = await res.json();
        form.value = {
          name: product.name,
          description: product.description,
          price: product.price,
          images: product.images.join("\n"),
          specifications: product.specifications ? product.specifications.map(spec => `${spec.key}: ${spec.value}`).join("\n") : "",
          existingCategory: product.category,
          newCategory: ""
        };
      }
    } catch (error) {
      console.error(error);
    }
  }
  onMounted(fetchProduct);
  
  async function submitForm() {
    const productData = {
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      images: form.value.images,
      specifications: form.value.specifications,
      category: form.value.newCategory.trim() !== "" ? form.value.newCategory.trim() : form.value.existingCategory
    };
    try {
      const res = await fetch(`http://138.68.93.210/products/edit/${route.params.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (res.ok) {
        router.push('/admin');
      }
    } catch (error) {
      console.error(error);
    }
  }
  </script>
  
  <style scoped>
  /* Дополнительные стили по необходимости */
  </style>
  