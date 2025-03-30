<template>
    <div class="py-16">
      <div class="container mx-auto px-4">
        <!-- Хлебные крошки -->
        <div class="flex items-center text-sm text-gray-400 mb-8">
          <router-link to="/" class="hover:text-white">Главная</router-link>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <router-link to="/catalog" class="hover:text-white">Каталог</router-link>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span>{{ product.name }}</span>
        </div>
  
        <!-- Основная информация о товаре -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Фотографии товара -->
          <div>
            <div class="bg-gray-900 rounded-lg overflow-hidden mb-4">
              <img  :src="activeImage" :alt="product.name" class="w-full  h-[480px]  object-cover" />
            </div>
            <div class="grid grid-cols-4 gap-4">
              <div 
                v-for="(image, index) in product.images" 
                :key="index" 
                class="bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                :class="{ 'ring-2 ring-green-500': activeImageIndex === index }"
                @click="activeImageIndex = index"
              >
                <img :src="image" :alt="`${product.name} - вид ${index + 1}`" class="w-full h-24 object-cover" />
              </div>
            </div>
          </div>
  
          <!-- Описание товара -->
          <div>
            <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
            
            <div class="flex items-center mb-6">
              <div class="flex items-center">
                <!-- Рейтинг (звёздочки) -->
                <svg 
                  v-for="i in 5"
                  :key="i"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-600'"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 
                           1 0 00.95.69h3.462c.969 0 1.371 1.24.588 
                           1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 
                           3.292c.3.921-.755 1.688-1.54 
                           1.118l-2.8-2.034a1 1 0 00-1.175 
                           0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
                           1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 
                           1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="text-gray-400 ml-2">{{ product.reviewCount }} отзывов</span>
            </div>
            
            <p class="text-3xl font-bold text-green-400 mb-6">{{ product.price }} ₽</p>
            
            <!-- Краткое описание + список фич -->
            <div class="mb-8">
              <h3 class="text-xl font-bold mb-4">Описание</h3>
              <p class="text-gray-300 mb-4">{{ product.description }}</p>
              <ul class="space-y-2 text-gray-300">
                <li 
                  v-for="(feature, index) in product.features"
                  :key="index"
                  class="flex items-start"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-green-400 mr-2 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path 
                      fill-rule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 
                         1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 
                         1 0 011.414-1.414L8 12.586l7.293-7.293a1 
                         1 0 011.414 0z" 
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>
            
            <!-- Выбор цвета -->
            <div class="mb-8">
              <h3 class="text-xl font-bold mb-4">Выберите цвет</h3>
              <div class="flex space-x-4">
                <button 
                  v-for="color in product.colors" 
                  :key="color.name" 
                  @click="selectedColor = color.value"
                  class="w-12 h-12 rounded-full border-2 focus:outline-none transition-transform duration-300 hover:scale-110"
                  :class="[
                    selectedColor === color.value ? 'border-green-500' : 'border-transparent',
                    color.value === 'white' ? 'bg-white' : color.value === 'black' ? 'bg-gray-900' : 'bg-green-500'
                  ]"
                  :title="color.name"
                ></button>
              </div>
            </div>
            
            <!-- Кнопки "Настроить" и "В корзину" -->
            <div class="flex space-x-4 mb-8">
              <button 
                @click="openCustomization"
                class="btn hover:opacity-70 bg-white text-black py-2 cursor-pointer btn-primary flex-1 rounded-md transition-all duration-300 hover:scale-105"
              >
                Настроить
              </button>
              <button 
                @click="addToCart"
                class="btn bg-white hover:opacity-70 text-black py-2 cursor-pointer btn-outline flex-1 rounded-md transition-all duration-300 hover:scale-105"
              >
                В корзину
              </button>
            </div>
            
            <!-- Информация о доставке -->
            <div class="bg-gray-900 p-4 rounded-lg">
              <h3 class="font-bold mb-2">Доставка</h3>
              <p class="text-gray-300 text-sm">Бесплатная доставка по России при заказе от 100 000 ₽</p>
            </div>
          </div>
        </div>
        
        <!-- Характеристики товара -->
        <div class="mt-16">
          <h2 class="text-2xl font-bold mb-6">Технические характеристики</h2>
          <div class="bg-gray-900 rounded-lg overflow-hidden">
            <div 
              v-for="(spec, index) in product.specifications"
              :key="index"
              class="grid grid-cols-1 md:grid-cols-3 border-b border-gray-800 last:border-b-0"
            >
              <div class="p-4 md:border-r border-gray-800 font-medium">{{ spec.name }}</div>
              <div class="p-4 md:col-span-2 text-gray-300">{{ spec.value }}</div>
            </div>
          </div>
        </div>
        
        <!-- Похожие товары -->
        <div class="mt-16">
          <h2 class="text-2xl font-bold mb-6">Похожие модели</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct.id"
              class="bg-gray-900 rounded-lg overflow-hidden group"
            >
              <div class="relative overflow-hidden">
                <img 
                  :src="relatedProduct.image"
                  :alt="relatedProduct.name"
                  class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold mb-2">{{ relatedProduct.name }}</h3>
                <div class="flex justify-between items-center">
                  <p class="text-green-400 font-bold">{{ relatedProduct.price }} ₽</p>
                  <router-link
                    :to="`/catalog/${relatedProduct.id}`"
                    class="text-sm text-gray-300 hover:text-white"
                  >
                    Подробнее
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <!-- Модальное окно кастомизации: улучшенный интерфейс -->
      <Transition name="modal">
        <div 
          v-if="isCustomizing"
          class="fixed inset-0 z-50 flex items-center justify-center"
        >
          <!-- Затемнённая подложка -->
          <div
            class="absolute inset-0 bg-black bg-opacity-90"
            @click="isCustomizing = false"
          ></div>
    
          <!-- Основной блок модалки -->
          <div
            class="relative w-full max-w-6xl h-[90vh] bg-gray-900 rounded-lg overflow-hidden flex flex-col 
                 border border-gray-700 shadow-2xl"
            style="background: radial-gradient(circle at center, #212121 30%, #111 90%)"
          >
            <!-- Шапка -->
            <div class="bg-black p-4 flex items-center justify-between border-b border-gray-700">
              <h2 class="text-xl font-bold text-green-400 tracking-wider uppercase">
                Тюнинг {{ product.name }}
              </h2>
              <button
                @click="isCustomizing = false"
                class="text-gray-400 hover:text-white transition-transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path 
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
    
            <!-- Основной контент кастомизации: адаптивный макет -->
            <div class="flex flex-1 overflow-hidden flex-col md:flex-row">
              <!-- Навигация по категориям (верхняя на мобильных, левая на десктопах) -->
              <div class="md:w-1/5 bg-gray-800 border-r border-gray-700 overflow-y-auto">
                <div class="p-2">
                  <div class="space-y-1">
                    <button
                      v-for="(category, index) in customizationCategories"
                      :key="index"
                      @click="activeCustomizationCategory = index"
                      class="w-full cursor-pointer px-4 py-3 rounded-md text-sm font-medium transition-all duration-300
                            flex items-center justify-between
                           focus:outline-none"
                      :class="
                        activeCustomizationCategory === index
                          ? 'bg-green-500 text-white shadow-green-500/50 shadow'
                          : 'bg-gray-700 text-gray-300'
                      "
                    >
                      <span class="cursor-pointer ">{{ category.name }}</span>
                      <svg 
                        v-if="activeCustomizationCategory === index"
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-5 w-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
    
              <!-- Центральная часть: предпросмотр и опции -->
              <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
                <!-- Предпросмотр (верхняя часть на мобильных, левая на десктопах) -->
                <div
                  class="md:w-1/2 h-64 md:h-auto bg-black p-4 flex items-center justify-center
                       relative overflow-hidden"
                  style="background: linear-gradient(135deg, #111 20%, #222 80%)"
                >
                  <!-- Изображение с учетом выбранных опций -->
                  <Transition name="fade" mode="out-in">
                    <img
                      :key="activeCustomizationCategory + '-' + JSON.stringify(customization)"
                      :src="customizedBikeImage"
                      alt="Customized Bike"
                      class="max-w-full max-h-full object-contain transition-all duration-500"
                    />
                  </Transition>
                </div>
    
                <!-- Панель опций (нижняя часть на мобильных, правая на десктопах) -->
                <div class="md:w-1/2 bg-gray-800 p-4 overflow-y-auto">
                  <div class="space-y-6">
                    <!-- Заголовок активной категории -->
                    <div class="sticky top-0 bg-gray-800 z-10 pb-2">
                      <h3 class="text-lg font-bold text-green-400 uppercase tracking-wider">
                        {{ customizationCategories[activeCustomizationCategory].name }}
                      </h3>
                    </div>
    
                    <!-- Опции для активной категории -->
                    <div class="space-y-6">
                        <div
                          v-for="(option, index) in customizationCategories[activeCustomizationCategory].options"
                          :key="option.id"
                          class="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 shadow-lg"
                        >
                          <div class="p-4 flex items-center justify-between border-b border-gray-600">
                            <div>
                              <h4 class="font-medium text-white">{{ option.name }}</h4>
                              <p class="text-sm text-gray-400">{{ option.description }}</p>
                            </div>
                            <div class="text-green-400 font-bold text-sm">
                              {{ option.price ? `+${option.price} ₽` : '' }}
                            </div>
                          </div>
                          <div class="p-4">
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              <TransitionGroup name="option" tag="div" class="contents">
                                <button
                                  v-for="(value, vIndex) in option.values"
                                  :key="value.id"
                                  @click="selectCustomizationOption(option.id, value.id)"
                                  class="px-3 py-3 rounded cursor-pointer text-sm transition-all duration-300 border
                                       hover:shadow-lg focus:outline-none relative overflow-hidden"
                                  :class="
                                    customization[option.id] === value.id
                                      ? 'bg-green-500 text-white border-green-400 shadow-green-500/50 shadow'
                                      : 'bg-gray-600 text-gray-300 border-gray-600 hover:bg-gray-500'
                                  "
                                >
                                  <div class="flex flex-col items-center">
                                    <span class="font-medium">{{ value.name }}</span>
                                    <span v-if="value.price" class="mt-1 text-xs opacity-80">
                                      (+{{ value.price }} ₽)
                                    </span>
                                  </div>
                                  
                                  <!-- Индикатор выбора -->
                                  <div 
                                    v-if="customization[option.id] === value.id"
                                    class="absolute top-1 right-1"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                    </svg>
                                  </div>
                                </button>
                              </TransitionGroup>
                            </div>
                          </div>
                        </div>
             
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            <!-- Подвал модального окна -->
            <div class="bg-black p-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-700 gap-4">
              <div>
                <div class="text-sm text-gray-400">Итоговая стоимость</div>
                <div class="text-2xl font-bold text-green-400">
                  {{ calculateTotalPrice() }} ₽
                </div>
              </div>
              <div class="flex space-x-4 w-full sm:w-auto">
                <button
                  @click="resetCustomization"
                  class="btn btn-outline text-gray-300 border border-gray-600 px-4 py-2 rounded-md
                       hover:bg-gray-700 hover:text-white transition-all hover:scale-105 flex-1 sm:flex-none"
                >
                  Сбросить
                </button>
                <button
                  @click="saveCustomization"
                  class="btn btn-primary bg-green-500 text-white px-4 py-2 rounded-md
                       hover:bg-green-400 transition-all hover:scale-105 flex-1 sm:flex-none"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </template>
    
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import img1 from "../assets/img1.png"
import img2 from "../assets/img1.png"
import img3 from "../assets/img1.png"
  // Подключаем роуты
  const route = useRoute();
  const router = useRouter();
    
  // Жестко заданные данные товара (в реальном проекте — загрузка с сервера)
  const product = ref({
    id: 1,
    name: 'E-BIKES Urban',
    description: 'Городской электровелосипед с минималистичным дизайном и передовыми технологиями. Идеально подходит для ежедневных поездок по городу.',
    price: '149 900',
    basePrice: 149900,
    rating: 4.8,
    reviewCount: 24,
    colors: [
      { name: 'Белый', value: 'white' },
      { name: 'Черный', value: 'black' },
      { name: 'Зеленый', value: 'green' }
    ],
    features: [
      'Mid-mounted мотор с оптимизированной плотностью крутящего момента',
      'Shimano 9-скоростная трансмиссия',
      'Аккумулятор 360Wh с возможностью быстрой зарядки',
      'Гидравлические дисковые тормоза',
      'Интегрированное освещение',
      'Матовое покрытие рамы'
    ],
    specifications: [
      { name: 'Двигатель', value: 'Mid-mounted, 250W' },
      { name: 'Аккумулятор', value: '360Wh, съемный' },
      { name: 'Запас хода', value: 'До 80 км' },
      { name: 'Максимальная скорость', value: '25 км/ч (ограничено)' },
      { name: 'Трансмиссия', value: 'Shimano 9-скоростная' },
      { name: 'Тормоза', value: 'Гидравлические дисковые' },
      { name: 'Вес', value: '18 кг' },
      { name: 'Рама', value: 'Алюминиевый сплав' },
      { name: 'Колеса', value: '28 дюймов' }
    ],
    images: [
    img1,
    img2,
       img3,
       img1
    ]
  });
    
  const relatedProducts = ref([
    {
      id: 2,
      name: 'E-BIKES Sport',
      price: '189 900',
      image: img1  },
    {
      id: 4,
      name: 'E-BIKES Urban Pro',
      price: '179 900',
      image: img2   },
    {
      id: 5,
      name: 'E-BIKES Sport Light',
      price: '169 900',
      image: img3   }
  ]);
    
  // Индекс текущего изображения товара
  const activeImageIndex = ref(0);
  
  // Выбранный цвет
  const selectedColor = ref('white');
  
  // Флаг открытия модального окна кастомизации
  const isCustomizing = ref(false);
  
  // Текущая активная категория в кастомизации
  const activeCustomizationCategory = ref(0);
  
  // Вычисляемое активное изображение товара (при клике по миниатюрам)
  const activeImage = computed(() => {
    return product.value.images[activeImageIndex.value];
  });
  
  // Объект выбранных опций тюнинга (ключи совпадают с id опций)
  const customization = ref({
    frame: 'standard',
    battery: 'standard',
    motor: 'standard',
    wheels: 'standard',
    suspension: 'standard',
    brakes: 'standard',
    accessories: 'none'
  });
  
  /**
   * Категории кастомизации с опциями.
   * Для первых трёх категорий добавлены изображения для каждого варианта.
   */
  const customizationCategories = ref([
    {
      name: 'Рама',
      options: [
        {
          id: 'frame',
          name: 'Материал рамы',
          description: 'Выберите материал для рамы велосипеда',
          values: [
            { id: 'standard', name: 'Алюминий', price: 0, img: '/src/assets/ram.png' },
            { id: 'premium', name: 'Карбон', price: 30000, img: '/src/assets/ram.png' },
            { id: 'titanium', name: 'Титан', price: 50000, img: '/src/assets/ram.png' }
          ]
        }
      ],
      img: '/src/assets/ram.png'
    },
    {
      name: 'Двигатель',
      options: [
        {
          id: 'motor',
          name: 'Тип двигателя',
          description: 'Выберите тип и мощность двигателя',
          values: [
            { id: 'standard', name: '250W Стандарт', price: 0, img: '/src/assets/motor.png' },
            { id: 'performance', name: '350W Performance', price: 15000, img: '/src/assets/motor.png' },
            { id: 'pro', name: '500W Pro', price: 25000, img: '/src/assets/motor.png' }
          ]
        }
      ],
      img: '/src/assets/motor.png'
    },
    {
      name: 'Аккумулятор',
      options: [
        {
          id: 'battery',
          name: 'Емкость аккумулятора',
          description: 'Выберите емкость аккумулятора',
          values: [
            { id: 'standard', name: '360Wh Стандарт', price: 0, img: '/src/assets/acc.png' },
            { id: 'extended', name: '500Wh Расширенный', price: 20000, img: '/src/assets/acc.png' },
            { id: 'max', name: '750Wh Максимальный', price: 35000, img: '/src/assets/acc.png' }
          ]
        }
      ],
      img: '/src/assets/acc.png'
    },
    {
      name: 'Колеса',
      options: [
        {
          id: 'wheels',
          name: 'Тип колес',
          description: 'Выберите тип колес',
          values: [
            { id: 'standard', name: 'Стандартные', price: 0,img: '/src/assets/wheel.png'  },
            { id: 'lightweight', name: 'Облегченные', price: 12000,img: '/src/assets/wheel.png'  },
            { id: 'offroad', name: 'Внедорожные', price: 15000,img: '/src/assets/wheel.png'  }
          ]
        }
      ]
    },
    {
      name: 'Подвеска',
      options: [
        {
          id: 'suspension',
          name: 'Тип подвески',
          description: 'Выберите тип подвески',
          values: [
            { id: 'standard', name: 'Жесткая вилка', price: 0,img: '/src/assets/pod.png' },
            { id: 'front', name: 'Передняя амортизация', price: 18000,img: '/src/assets/pod.png' },
            { id: 'full', name: 'Полная амортизация', price: 35000,img: '/src/assets/pod.png'  },
            { id: 'full', name: 'Полная амортизация', price: 35000,img: '/src/assets/pod.png' }
          ]
        }
      ]
    },
    {
      name: 'Тормоза',
      options: [
        {
          id: 'brakes',
          name: 'Тип тормозов',
          description: 'Выберите тип тормозной системы',
          values: [
            { id: 'standard', name: 'Гидравлические', price: 0,img: '/src/assets/brakes.png' },
            { id: 'premium', name: 'Премиум гидравлические', price: 10000,img: '/src/assets/brakes.png' }
          ]
        }
      ]
    },
    {
      name: 'Аксессуары',
      options: [
        {
          id: 'accessories',
          name: 'Дополнительные аксессуары',
          description: 'Выберите дополнительные аксессуары',
          values: [
            { id: 'none', name: 'Без аксессуаров', price: 0 },
            { id: 'lights', name: 'Комплект освещения', price: 5000 },
            { id: 'rack', name: 'Багажник', price: 7000 },
            { id: 'fenders', name: 'Крылья', price: 3000 },
            { id: 'full', name: 'Полный комплект', price: 12000 }
          ]
        }
      ]
    }
  ]);
    
  /**
   * Вычисляемое свойство для картинки в блоке предпросмотра кастомизации.
   * Если для активной категории выбран вариант, и у него есть img — возвращается он,
   * иначе используется картинка по умолчанию для категории или базовое изображение товара.
   */
  const customizedBikeImage = computed(() => {
    const currentCategory = customizationCategories.value[activeCustomizationCategory.value];
    if (currentCategory) {
      const option = currentCategory.options[0];
      const selectedValueId = customization.value[option.id];
      const selectedValue = option.values.find(val => val.id === selectedValueId);
      if (selectedValue && selectedValue.img) {
        return selectedValue.img;
      }
      if (currentCategory.img) {
        return currentCategory.img;
      }
    }
    return product.value.images[0];
  });
    
  // Методы
    
  function openCustomization() {
    isCustomizing.value = true;
  }
    
  function selectCustomizationOption(optionId, valueId) {
    customization.value[optionId] = valueId;
  }
    
  function calculateTotalPrice() {
    let total = product.value.basePrice;
    Object.entries(customization.value).forEach(([optionId, valueId]) => {
      const category = customizationCategories.value.find(cat =>
        cat.options.some(opt => opt.id === optionId)
      );
      if (category) {
        const option = category.options.find(opt => opt.id === optionId);
        if (option) {
          const value = option.values.find(val => val.id === valueId);
          if (value && value.price) {
            total += value.price;
          }
        }
      }
    });
    return new Intl.NumberFormat('ru-RU').format(total);
  }
    
  function resetCustomization() {
    customization.value = {
      frame: 'standard',
      battery: 'standard',
      motor: 'standard',
      wheels: 'standard',
      suspension: 'standard',
      brakes: 'standard',
      accessories: 'none'
    };
  }
    
  function saveCustomization() {
    alert('Конфигурация сохранена!');
    isCustomizing.value = false;
  }
    
  function addToCart() {
    alert(`Товар "${product.value.name}" добавлен в корзину`);
  }
    
  onMounted(() => {
 
  });
  </script>
    
  <style scoped>
  /* Кастомный скроллбар для правой панели модального окна */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #1f2937;
  }
  ::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
  
  /* Анимации для модального окна */
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  
  /* Анимации для списка опций */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  
  /* Анимации для опций */
  .option-enter-active,
  .option-leave-active {
    transition: all 0.3s ease;
  }
  .option-enter-from,
  .option-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }
  
  /* Анимации для изображений */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>