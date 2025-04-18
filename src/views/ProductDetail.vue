<template>
  <div  v-if="product.name"  class="py-8 md:py-16">
    <div  class="container mx-auto px-4">
      <!-- Хлебные крошки -->
      <div class="flex flex-wrap items-center text-sm text-gray-400 mb-6 md:mb-8">
        <router-link to="/" class="hover:text-white">Главная</router-link>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <router-link to="/catalog" class="hover:text-white">Каталог</router-link>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="truncate max-w-[150px] md:max-w-none">{{ product.name }}</span>
      </div>

      <!-- Основная информация о товаре -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
        <!-- Фотографии товара -->
        <div>
          <div class="bg-gray-900 md:h-[500px] rounded-lg overflow-hidden mb-4">
            <img style="object-position: center;" :src="activeImage" :alt="product.name" class="w-full h-full object-cover" />
          </div>
          <div class="grid grid-cols-4 gap-2 md:gap-4">
            <div v-for="(image, index) in product.images" :key="index"
              class="bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
              :class="{ 'ring-2 ring-green-500': activeImageIndex === index }" @click="activeImageIndex = index">
              <img :src="image" :alt="`${product.name} - вид ${index + 1}`" class="w-full h-16 md:h-24 object-cover" />
            </div>
          </div>
        </div>

        <!-- Описание товара -->
        <div>
          <h1 class="text-2xl md:text-3xl font-bold mb-4">{{ product.name }}</h1>

          <div class="flex items-center mb-4 md:mb-6">
            <div class="flex items-center">
              <!-- Рейтинг (звёздочки) -->
              <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5"
                :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-600'" viewBox="0 0 20 20"
                fill="currentColor">
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
            <span class="text-gray-400 ml-2 text-sm md:text-base">{{ product.reviewCount }} отзывов</span>
          </div>

          <p class="text-2xl md:text-3xl font-bold text-green-400 mb-4 md:mb-6">{{ product.price }} ₸</p>

          <!-- Краткое описание + список фич -->
          <div class="mb-6 md:mb-8">
            <h3 class="text-lg md:text-xl font-bold mb-3 md:mb-4">Описание</h3>
            <p class="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">{{ product.description }}</p>
            <ul class="space-y-1 md:space-y-2 text-gray-300 text-sm md:text-base">
              <li v-for="(feature, index) in product.features" :key="index" class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 text-green-400 mr-2 mt-0.5"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 
                       1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 
                       1 0 011.414-1.414L8 12.586l7.293-7.293a1 
                       1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Выбор цвета -->
          <div class="mb-6 md:mb-8">
            <h3 class="text-lg md:text-xl font-bold mb-3 md:mb-4">Выберите цвет</h3>
            <div class="flex space-x-3 md:space-x-4">
              <button v-for="color in product.colors" :key="color.name" @click="selectedColor = color.value"
                class="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 focus:outline-none transition-transform duration-300 hover:scale-110"
                :class="[
                  selectedColor === color.value ? 'border-green-500' : 'border-transparent',
                  color.value === 'white' ? 'bg-white' : color.value === 'black' ? 'bg-gray-900' : 'bg-green-500'
                ]" :title="color.name"></button>
            </div>
          </div>

          <!-- Кнопки "Настроить" и "В корзину" -->
          <div class="flex space-x-3 md:space-x-4 mb-6 md:mb-8">
            <button @click="openCustomization"
              class="btn hover:opacity-70 bg-white text-black py-2 px-3 md:py-3 md:px-4 cursor-pointer btn-primary flex-1 rounded-md transition-all duration-300 hover:scale-105 text-sm md:text-base font-medium">
              Настроить
            </button>
            <button @click="addToCart"
              class="btn bg-white hover:opacity-70 text-black py-2 px-3 md:py-3 md:px-4 cursor-pointer btn-outline flex-1 rounded-md transition-all duration-300 hover:scale-105 text-sm md:text-base font-medium">
              В корзину
            </button>
          </div>

          <!-- Информация о доставке -->
          <div class="bg-gray-900 p-3 md:p-4 rounded-lg">
            <h3 class="font-bold mb-1 md:mb-2 text-sm md:text-base">Доставка</h3>
            <p class="text-gray-300 text-xs md:text-sm">Бесплатная доставка по России при заказе от 100 000 ₸</p>
          </div>
        </div>
      </div>

      <!-- Характеристики товара -->
      <div class="mt-10 md:mt-16">
        <h2 class="text-xl md:text-2xl font-bold mb-4 md:mb-6">Технические характеристики</h2>
        <div class="bg-gray-900 rounded-lg overflow-hidden">
          <div v-for="(spec, index) in product.specifications" :key="index"
            class="grid grid-cols-1 md:grid-cols-3 border-b border-gray-800 last:border-b-0">
            <div class="p-3 md:p-4 md:border-r border-gray-800 font-medium text-sm md:text-base">{{ spec.name }}</div>
            <div class="p-3 md:p-4 md:col-span-2 text-gray-300 text-sm md:text-base">{{ spec.value }}</div>
          </div>
        </div>
      </div>

      <!-- Похожие товары -->
      <div class="mt-10 md:mt-16">
        <h2 class="text-xl md:text-2xl font-bold mb-4 md:mb-6">Похожие модели</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id"
            class="bg-gray-900 rounded-lg overflow-hidden group">
            <div class="relative overflow-hidden">
              <img :src="relatedProduct.images[0]" :alt="relatedProduct.name"
                class="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="p-4 md:p-6">
              <h3 class="text-base md:text-lg font-bold mb-2">{{ relatedProduct.name }}</h3>
              <div class="flex justify-between items-center">
                <p class="text-green-400 font-bold text-sm md:text-base">{{ relatedProduct.price }} ₸</p>
                <router-link :to="`/catalog/${relatedProduct.id}`"
                  class="text-xs md:text-sm text-gray-300 hover:text-white">
                  Подробнее
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно кастомизации: улучшенный интерфейс для мобильных устройств -->
    <Transition name="modal">
      <div v-if="isCustomizing" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Затемнённая подложка -->
        <div class="absolute inset-0 bg-black bg-opacity-90" @click="isCustomizing = false"></div>

        <!-- Основной блок модалки -->
        <div class="relative w-full max-w-6xl h-[95vh] md:h-[90vh] bg-gray-900 rounded-lg overflow-hidden flex flex-col 
               border border-gray-700 shadow-2xl m-2"
          style="background: radial-gradient(circle at center, #212121 30%, #111 90%)">
          <!-- Шапка -->
          <div class="bg-black p-3 md:p-4 flex items-center justify-between border-b border-gray-700">
            <h2 class="text-lg md:text-xl font-bold text-green-400 tracking-wider uppercase truncate mr-2">
              Тюнинг {{ product.name }}
            </h2>
            <button @click="isCustomizing = false"
              class="text-gray-400 hover:text-white transition-transform hover:scale-110 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Мобильная навигация по категориям (горизонтальный скролл) -->
          <div class="md:hidden bg-gray-800 border-b border-gray-700 overflow-x-auto">
            <div class="flex p-2 space-x-2">
              <button v-for="(category, index) in customizationCategories" :key="index"
                @click="activeCustomizationCategory = index" class="px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-300
                     hover:bg-gray-700 focus:outline-none flex-shrink-0" :class="activeCustomizationCategory === index
                        ? 'bg-green-500 text-white shadow-green-500/50 shadow'
                        : 'bg-gray-700 text-gray-300'
                      ">
                {{ category.name }}
              </button>
            </div>
          </div>

          <!-- Основной контент кастомизации: адаптивный макет -->
          <div class="flex flex-1 overflow-hidden flex-col md:flex-row">
            <!-- Навигация по категориям (только на десктопах) -->
            <div class="hidden md:block md:w-1/5 bg-gray-800 border-r border-gray-700 overflow-y-auto">
              <div class="p-2">
                <div class="space-y-1">
                  <button v-for="(category, index) in customizationCategories" :key="index"
                    @click="activeCustomizationCategory = index" class="w-full px-4 py-3 rounded-md text-sm font-medium transition-all duration-300
                         hover:bg-gray-700 flex items-center justify-between
                         focus:outline-none" :class="activeCustomizationCategory === index
                            ? 'bg-green-500 text-white shadow-green-500/50 shadow'
                            : 'bg-gray-700 text-gray-300'
                          ">
                    <span>{{ category.name }}</span>
                    <svg v-if="activeCustomizationCategory === index" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                      viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Центральная часть: предпросмотр и опции (адаптивная для мобильных) -->
            <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
              <!-- Предпросмотр (верхняя часть на мобильных, левая на десктопах) -->
              <div class="h-48 sm:h-64 md:h-auto md:w-1/2 bg-black p-4 flex items-center justify-center
                     relative overflow-hidden" style="background: linear-gradient(135deg, #111 20%, #222 80%)">
                <!-- Изображение с учетом выбранных опций -->
                <Transition name="fade" mode="out-in">
                  <div :key="activeCustomizationCategory + '-' + JSON.stringify(customization)"
                    class="flex flex-col items-center justify-center">
                    <div class="text-center mb-2 md:mb-4">
                      <h3 class="text-base md:text-xl font-bold text-green-400">
                        {{ customizationCategories[activeCustomizationCategory].name }}
                      </h3>
                      <p class="text-xs md:text-sm text-gray-300">
                        {{ getSelectedOptionName() }}
                      </p>
                    </div>
                    <img :src="customizedBikeImage" alt="Customized Bike"
                      class="max-w-full max-h-28 sm:max-h-40 md:max-h-full object-contain transition-all duration-500" />
                  </div>
                </Transition>
              </div>

              <!-- Панель опций (нижняя часть на мобильных, правая на десктопах) -->
              <div class="md:w-1/2 bg-gray-800 flex-1 overflow-y-auto">
                <div class="p-3 md:p-4 space-y-4 md:space-y-6">
                  <!-- Опции для активной категории -->
                  <div name="list" tag="div" class="space-y-3 md:space-y-4">
                    <div v-for="(option, index) in customizationCategories[activeCustomizationCategory].options"
                      :key="option.id" class="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 shadow-lg">
                      <div class="p-3 md:p-4 flex items-center justify-between border-b border-gray-600">
                        <div>
                          <h4 class="font-medium text-white text-sm md:text-base">{{ option.name }}</h4>
                          <p class="text-xs md:text-sm text-gray-400">{{ option.description }}</p>
                        </div>
                        <div class="text-green-400 font-bold text-xs md:text-sm">
                          {{ option.price ? `+${option.price} ₸` : '' }}
                        </div>
                      </div>
                      <div class="p-3 md:p-4">
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                          <TransitionGroup name="option" tag="div" class="contents">
                            <button v-for="(value, vIndex) in option.values" :key="value.id"
                              @click="selectCustomizationOption(option.id, value.id)" class="px-2 py-2 md:px-3 md:py-3 rounded text-xs md:text-sm transition-all duration-300 border
                                   hover:shadow-lg focus:outline-none relative overflow-hidden" :class="customization[option.id] === value.id
                                      ? 'bg-green-500 text-white border-green-400 shadow-green-500/50 shadow'
                                      : 'bg-gray-600 text-gray-300 border-gray-600 hover:bg-gray-500'
                                    ">
                              <div class="flex flex-col items-center">
                                <span class="font-medium">{{ value.name }}</span>
                                <span v-if="value.price" class="mt-1 text-[10px] md:text-xs opacity-80">
                                  (+{{ value.price }} ₸)
                                </span>
                              </div>

                              <!-- Индикатор выбора -->
                              <div v-if="customization[option.id] === value.id" class="absolute top-1 right-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 md:h-4 md:w-4"
                                  viewBox="0 0 20 20" fill="currentColor">
                                  <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd" />
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
          <div
            class="bg-black p-3 md:p-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-700 gap-3 md:gap-4">
            <div class="text-center sm:text-left w-full sm:w-auto">
              <div class="text-xs md:text-sm text-gray-400">Итоговая стоимость</div>
              <div class="text-xl md:text-2xl font-bold text-green-400">
                {{ calculateTotalPrice() }} ₸
              </div>
            </div>
            <div class="flex space-x-3 md:space-x-4 w-full sm:w-auto">
              <button @click="resetCustomization" class="btn btn-outline text-gray-300 border border-gray-600 px-3 py-2 md:px-4 md:py-2 rounded-md
                     hover:bg-gray-700 hover:text-white transition-all hover:scale-105 flex-1 sm:flex-none
                     text-xs md:text-sm">
                Сбросить
              </button>
              <button @click="saveCustomization" class="btn btn-primary bg-green-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-md
                     hover:bg-green-400 transition-all hover:scale-105 flex-1 sm:flex-none
                     text-xs md:text-sm">
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

// Подключаем роуты
const route = useRoute();
const router = useRouter();
const product = ref({});
const products = ref([]);

const relatedProducts = computed(() => {
  return products.value
    .filter(p => p.id !== product.value.id)
    .slice(0, 3);
});



console.log(relatedProducts)
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
          { id: 'standard', name: 'Алюминий', price: 0, img: '/ram.png' },
          { id: 'premium', name: 'Карбон', price: 30000, img: '/ram.png' },
          { id: 'titanium', name: 'Титан', price: 50000, img: '/ram.png' }
        ]
      }
    ],
    img: '/ram.png'
  },
  {
    name: 'Двигатель',
    options: [
      {
        id: 'motor',
        name: 'Тип двигателя',
        description: 'Выберите тип и мощность двигателя',
        values: [
          { id: 'standard', name: '250W Стандарт', price: 0, img: '/motor.png' },
          { id: 'performance', name: '350W Performance', price: 15000, img: '/motor.png' },
          { id: 'pro', name: '500W Pro', price: 25000, img: '/motor.png' }
        ]
      }
    ],
    img: '/motor.png'
  },
  {
    name: 'Аккумулятор',
    options: [
      {
        id: 'battery',
        name: 'Емкость аккумулятора',
        description: 'Выберите емкость аккумулятора',
        values: [
          { id: 'standard', name: '360Wh Стандарт', price: 0, img: '/acc.png' },
          { id: 'extended', name: '500Wh Расширенный', price: 20000, img: '/acc.png' },
          { id: 'max', name: '750Wh Максимальный', price: 35000, img: '/acc.png' }
        ]
      }
    ],
    img: '/acc.png'
  },
  {
    name: 'Колеса',
    options: [
      {
        id: 'wheels',
        name: 'Тип колес',
        description: 'Выберите тип колес',
        values: [
          { id: 'standard', name: 'Стандартные', price: 0, img: '/wheel.png' },
          { id: 'lightweight', name: 'Облегченные', price: 12000, img: '/wheel.png' },
          { id: 'offroad', name: 'Внедорожные', price: 15000, img: '/wheel.png' }
        ]
      }
    ],
    img: '/wheel.png'
  },
  {
    name: 'Подвеска',
    options: [
      {
        id: 'suspension',
        name: 'Тип подвески',
        description: 'Выберите тип подвески',
        values: [
          { id: 'standard', name: 'Жесткая вилка', price: 0, img: '/pod.png' },
          { id: 'front', name: 'Передняя амортизация', price: 18000, img: '/pod.png' },
          { id: 'full', name: 'Полная амортизация', price: 35000, img: '/pod.png' }
        ]
      }
    ],
    img: '/pod.png'
  },
  {
    name: 'Тормоза',
    options: [
      {
        id: 'brakes',
        name: 'Тип тормозов',
        description: 'Выберите тип тормозной системы',
        values: [
          { id: 'standard', name: 'Гидравлические', price: 0, img: '/brakes.png' },
          { id: 'premium', name: 'Премиум гидравлические', price: 10000, img: '/brakes.png' }
        ]
      }
    ],
    img: '/brakes.png'
  },
  {
    name: 'Аксессуары',
    options: [
      {
        id: 'accessories',
        name: 'Дополнительные аксессуары',
        description: 'Выберите дополнительные аксессуары',
        values: [
          { id: 'none', name: 'Без аксессуаров', price: 0, img: '/none.png' },
          { id: 'lights', name: 'Комплект освещения', price: 5000, img: '/lights.png' },
          { id: 'rack', name: 'Багажник', price: 7000, img: '/rack.png' },
          { id: 'fenders', name: 'Крылья', price: 3000, img: '/fenders.png' },
          { id: 'full', name: 'Полный комплект', price: 12000, img: '/full.png' }
        ]
      }
    ],
    img: '/accessories.png'
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

/**
 * Получить название выбранной опции для текущей категории
 */
const getSelectedOptionName = () => {
  const currentCategory = customizationCategories.value[activeCustomizationCategory.value];
  if (currentCategory) {
    const option = currentCategory.options[0];
    const selectedValueId = customization.value[option.id];
    const selectedValue = option.values.find(val => val.id === selectedValueId);
    if (selectedValue) {
      return `${option.name}: ${selectedValue.name}${selectedValue.price ? ` (+${selectedValue.price} ₸)` : ''}`;
    }
  }
  return '';
};

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

onMounted(async () => {
  try {
    const resProduct = await fetch(`http://138.68.93.210/products/${route.params.id}`);
    if (resProduct.ok) {
      product.value = await resProduct.json();
    }

    const resAll = await fetch('http://138.68.93.210/products');
    if (resAll.ok) {
      products.value = await resAll.json();
    }
  } catch (error) {
    console.error('Ошибка загрузки:', error);
  }
});

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
</script>

<style scoped>
/* Кастомный скроллбар для правой панели модального окна */
::-webkit-scrollbar {
  width: 6px;
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
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Анимации для списка опций */
.list-enter-active,
.list-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Анимации для опций */
.option-enter-active,
.option-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.option-enter-from,
.option-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Анимации для изображений */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


/* Медиа-запросы для адаптивности */
@media (max-width: 640px) {
  .container {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>