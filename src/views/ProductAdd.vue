<template>
    <div class="product-add">
      <h1>Добавить новый товар</h1>
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="name">Название:</label>
          <input id="name" v-model="form.name" type="text" required />
        </div>
        <div class="form-group">
          <label for="description">Описание:</label>
          <textarea id="description" v-model="form.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="price">Цена (₸):</label>
          <input id="price" v-model="form.price" type="number" required />
        </div>
        <div class="form-group">
          <label for="image">Ссылка на изображение:</label>
          <input id="image" v-model="form.image" type="text" required />
        </div>
        <div class="form-group">
          <label for="category">Категория:</label>
          <select id="category" v-model="form.category">
            <option value="">Выберите категорию</option>
            <option value="urban">Городской</option>
            <option value="sport">Спортивный</option>
            <option value="cargo">Грузовой</option>
          </select>
        </div>
        <div class="form-group">
          <label for="color">Цвет:</label>
          <select id="color" v-model="form.color">
            <option value="">Выберите цвет</option>
            <option value="white">Белый</option>
            <option value="black">Черный</option>
            <option value="green">Зеленый</option>
          </select>
        </div>
        <div class="form-group">
          <label for="popular">Популярность (число):</label>
          <input id="popular" v-model.number="form.popular" type="number" />
        </div>
        <div class="form-group">
          <label for="isNew">Новинка:</label>
          <input id="isNew" v-model="form.isNew" type="checkbox" />
        </div>
        <button type="submit">Добавить товар</button>
      </form>
      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const form = ref({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    color: '',
    popular: 0,
    isNew: false,
  });
  
  const message = ref('');
  
  async function submitForm() {
    try {
      const response = await fetch('http://localhost:3000/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value),
      });
      const data = await response.json();
      if (response.ok) {
        message.value = 'Товар успешно добавлен';
        // Сброс формы
        form.value = {
          name: '',
          description: '',
          price: '',
          image: '',
          category: '',
          color: '',
          popular: 0,
          isNew: false,
        };
      } else {
        message.value = data.error || 'Ошибка при добавлении товара';
      }
    } catch (error) {
      console.error('Ошибка:', error);
      message.value = 'Ошибка при добавлении товара';
    }
  }
  </script>
  
  <style scoped>
  .product-add {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
  }
  button {
    padding: 0.75rem 1.5rem;
    background-color: #4caf50;
    border: none;
    color: #fff;
    cursor: pointer;
  }
  .message {
    margin-top: 1rem;
    font-weight: bold;
  }
  </style>
  