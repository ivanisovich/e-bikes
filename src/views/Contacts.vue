<template>
    <div class="py-16">
      <div class="container">
        <h1 class="section-title">Контакты</h1>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Info -->
          <div>
            <div class="bg-gray-900 rounded-lg p-8 mb-8">
              <h2 class="text-2xl font-bold mb-6">Свяжитесь с нами</h2>
              
              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <MapPin class="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 class="font-bold mb-1">Адрес</h3>
                    <p class="text-gray-300">Москва, ул. Велосипедная, 42</p>
                    <p class="text-gray-300">БЦ "Электрон", 3 этаж</p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <Phone class="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 class="font-bold mb-1">Телефон</h3>
                    <p class="text-gray-300">+7 (800) 123-45-67</p>
                    <p class="text-gray-300">+7 (495) 987-65-43</p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <Mail class="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 class="font-bold mb-1">Email</h3>
                    <p class="text-gray-300">info@e-bikes.com</p>
                    <p class="text-gray-300">support@e-bikes.com</p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <Clock class="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 class="font-bold mb-1">Часы работы</h3>
                    <p class="text-gray-300">Пн-Пт: 10:00 - 20:00</p>
                    <p class="text-gray-300">Сб-Вс: 11:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-900 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-6">Мы в социальных сетях</h2>
              
              <div class="flex space-x-4">
                <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                  <Instagram class="h-6 w-6" />
                </a>
                <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                  <Facebook class="h-6 w-6" />
                </a>
                <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                  <Twitter class="h-6 w-6" />
                </a>
                <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                  <Youtube class="h-6 w-6" />
                </a>
                <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                  <Send class="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="bg-gray-900 rounded-lg p-8">
            <h2 class="text-2xl font-bold mb-6">Напишите нам</h2>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium mb-2">Имя</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  id="name" 
                  class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                  required
                />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium mb-2">Email</label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  id="email" 
                  class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                  required
                />
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium mb-2">Тема</label>
                <select 
                  v-model="form.subject" 
                  id="subject" 
                  class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                  required
                >
                  <option value="">Выберите тему</option>
                  <option value="general">Общие вопросы</option>
                  <option value="order">Вопросы по заказу</option>
                  <option value="service">Сервисное обслуживание</option>
                  <option value="partnership">Сотрудничество</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium mb-2">Сообщение</label>
                <textarea 
                  v-model="form.message" 
                  id="message" 
                  rows="6" 
                  class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                  required
                ></textarea>
              </div>
              
              <div class="flex items-center">
                <input 
                  v-model="form.agreement" 
                  type="checkbox" 
                  id="agreement" 
                  class="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-700 rounded" 
                  required
                />
                <label for="agreement" class="ml-2 block text-sm text-gray-300">
                  Я согласен на обработку персональных данных
                </label>
              </div>
              
              <button type="submit" class="btn btn-primary w-full">
                Отправить сообщение
              </button>
            </form>
            
            <div v-if="formSubmitted" class="mt-6 p-4 bg-green-500/20 rounded-md text-green-400 text-center">
              Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.
            </div>
          </div>
        </div>
        
        <!-- Map -->
        <div class="mt-12">
          <h2 class="text-2xl font-bold mb-6">Как нас найти</h2>
          
          <div class="bg-gray-900 rounded-lg overflow-hidden h-[400px] relative">
            <!-- This would be a real map in a production environment -->
            <div class="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div class="text-center">
                <MapPin class="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p class="text-xl font-bold">Карта загружается...</p>
                <p class="text-gray-400">Москва, ул. Велосипедная, 42</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Showroom -->
        <div class="mt-12">
          <h2 class="text-2xl font-bold mb-6">Наш шоурум</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gray-900 rounded-lg overflow-hidden">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ebikesguide-4-qJW5Aw8BdhwHJ9SkgXhvXJp6HQx3df.webp" alt="Шоурум E-BIKES" class="w-full h-64 object-cover" />
            </div>
            <div class="bg-gray-900 rounded-lg overflow-hidden">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ebikesguide-9-pt2emRAFMiKBqKWvBkl73hzQkVxkRP.webp" alt="Шоурум E-BIKES" class="w-full h-64 object-cover" />
            </div>
            <div class="bg-gray-900 rounded-lg overflow-hidden">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ebikesguide-6-eI38542moWih50Zva3f22zJhgM7a2N.webp" alt="Шоурум E-BIKES" class="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Youtube, Send } from 'lucide-vue-next';
  
  const form = ref({
    name: '',
    email: '',
    subject: '',
    message: '',
    agreement: false
  });
  
  const formSubmitted = ref(false);
  
  function submitForm() {
    // In a real app, this would submit the form data to a server
    console.log('Form submitted:', form.value);
    
    // Show success message
    formSubmitted.value = true;
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
      agreement: false
    };
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      formSubmitted.value = false;
    }, 5000);
  }
  </script>