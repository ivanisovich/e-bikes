<template>
  <div class="min-h-screen bg-black text-white font-unbounded">
    <!-- Header with navigation -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <div class="text-white text-2xl font-bold tracking-wider flex items-center">
            <span class="mr-1">E</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>BIKES</span>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link to="/catalog" class="text-white hover:text-green-400 transition-colors">
            Ассортимент
          </router-link>
          <router-link to="/service" class="text-white hover:text-green-400 transition-colors">
            Техническое обслуживание
          </router-link>
          <router-link to="/contacts" class="text-white hover:text-green-400 transition-colors">
            Контакты
          </router-link>
        </nav>

        <!-- Mobile menu button -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden text-white">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="isMobileMenuOpen" class="md:hidden bg-black">
        <div class="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <router-link @click="isMobileMenuOpen = false" to="/catalog" class="text-white hover:text-green-400 transition-colors py-2">
            Ассортимент
          </router-link>
          <router-link @click="isMobileMenuOpen = false" to="/service" class="text-white hover:text-green-400 transition-colors py-2">
            Техническое обслуживание
          </router-link>
          <router-link @click="isMobileMenuOpen = false" to="/contacts" class="text-white hover:text-green-400 transition-colors py-2">
            Контакты
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="pt-20 pl-[20px] pr-[20px]">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-black py-10 mt-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between">
          <div class="mb-8 md:mb-0">
            <div class="text-white text-2xl font-bold tracking-wider flex items-center mb-4">
              <span class="mr-1">E</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span>BIKES</span>
            </div>
            <p class="text-gray-400 max-w-md">
              Современные электровелосипеды с минималистичным дизайном и передовыми технологиями для городской среды.
            </p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 class="text-white font-medium mb-4">Навигация</h3>
              <ul class="space-y-2">
                <li><router-link to="/" class="text-gray-400 hover:text-green-400 transition-colors">Главная</router-link></li>
                <li><router-link to="/catalog" class="text-gray-400 hover:text-green-400 transition-colors">Ассортимент</router-link></li>
                <li><router-link to="/service" class="text-gray-400 hover:text-green-400 transition-colors">Обслуживание</router-link></li>
                <li><router-link to="/contacts" class="text-gray-400 hover:text-green-400 transition-colors">Контакты</router-link></li>
              </ul>
            </div>
            <div>
              <h3 class="text-white font-medium mb-4">Контакты</h3>
              <ul class="space-y-2 text-gray-400">
                <li>info@e-bikes.com</li>
                <li>+7 (800) 123-45-67</li>
                <li>Москва, ул. Велосипедная, 42</li>
              </ul>
            </div>
            <div class="col-span-2 md:col-span-1">
              <h3 class="text-white font-medium mb-4">Подписка</h3>
              <p class="text-gray-400 mb-4">Подпишитесь на новости о новых моделях и акциях</p>
              <div class="flex">
                <input type="email" placeholder="Email" class="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full" />
                <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-md transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p>© {{ new Date().getFullYear() }} E-BIKES. Все права защищены.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref,watch } from 'vue';
import { useRoute } from 'vue-router';

const isMobileMenuOpen = ref(false);
const route = useRoute();

// Close mobile menu when route changes
watch(() => route.path, () => {
  isMobileMenuOpen.value = false;
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;600;700&display=swap');

.font-unbounded {
  font-family: 'Unbounded', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>