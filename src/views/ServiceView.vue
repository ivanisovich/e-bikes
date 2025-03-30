<template>
    <div class="py-16">
      <div class="container">
        <h1 class="section-title">Техническое обслуживание</h1>
        
        <!-- Hero Section -->
        <div class="relative rounded-lg overflow-hidden mb-16">
          <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-gradient-to-r from-black to-black/70"></div>
            <img src="/img3.png" alt="Техническое обслуживание" class="w-full h-full object-cover object-center" />
          </div>
          
          <div class="relative z-10 p-8 md:p-12 lg:p-16">
            <div class="max-w-2xl">
              <h2 class="text-3xl md:text-4xl font-bold mb-6">Профессиональное обслуживание электровелосипедов</h2>
              <p class="text-lg md:text-xl mb-8 text-gray-300">
                Наши сертифицированные специалисты обеспечат максимальную производительность и долговечность вашего E-BIKE
              </p>
              <button @click="scrollToForm" class="btn btn-primary">
                Записаться на сервис
              </button>
            </div>
          </div>
        </div>
        
        <!-- Service Types -->
        <div class="mb-16">
          <h2 class="text-2xl font-bold mb-8">Виды обслуживания</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(service, index) in services" :key="index" class="bg-gray-900 rounded-lg overflow-hidden">
              <div class="p-6">
                <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-6">
                  <component :is="service.icon" class="h-6 w-6 text-white" />
                </div>
                <h3 class="text-xl font-bold mb-4">{{ service.name }}</h3>
                <p class="text-gray-300 mb-4">{{ service.description }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-green-400 font-bold">от {{ service.price }} ₽</span>
                  <button @click="selectService(service)" class="text-sm underline text-gray-300 hover:text-white">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Service Process -->
        <div class="mb-16">
          <h2 class="text-2xl font-bold mb-8">Как проходит обслуживание</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div v-for="(step, index) in serviceProcess" :key="index" class="bg-gray-900 rounded-lg p-6">
              <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-6 text-xl font-bold text-white">
                {{ index + 1 }}
              </div>
              <h3 class="text-xl font-bold mb-4">{{ step.title }}</h3>
              <p class="text-gray-300">{{ step.description }}</p>
            </div>
          </div>
        </div>
        
        <!-- FAQ -->
        <div class="mb-16">
          <h2 class="text-2xl font-bold mb-8">Часто задаваемые вопросы</h2>
          
          <div class="space-y-4">
            <div v-for="(faq, index) in faqs" :key="index" class="bg-gray-900 rounded-lg overflow-hidden">
              <button 
                @click="toggleFaq(index)" 
                class="w-full p-6 text-left flex items-center justify-between focus:outline-none"
              >
                <h3 class="text-lg font-medium">{{ faq.question }}</h3>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 transition-transform" 
                  :class="activeFaq === index ? 'transform rotate-180' : ''"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                v-show="activeFaq === index" 
                class="px-6 pb-6 text-gray-300"
              >
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Service Form -->
        <div id="service-form" class="bg-gray-900 rounded-lg p-8">
          <h2 class="text-2xl font-bold mb-8">Запись на обслуживание</h2>
          
          <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
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
                <label for="phone" class="block text-sm font-medium mb-2">Телефон</label>
                <input 
                  v-model="form.phone" 
                  type="tel" 
                  id="phone" 
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
                <label for="bikeModel" class="block text-sm font-medium mb-2">Модель велосипеда</label>
                <input 
                  v-model="form.bikeModel" 
                  type="text" 
                  id="bikeModel" 
                  class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                  required
                />
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <label for="serviceType" class="block text-sm font-medium mb-2">Тип обслуживания</label>
                <select 
                  v-model="form.serviceType" 
                  id="serviceType" 
                  class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                  required
                >
                  <option value="">Выберите тип обслуживания</option>
                  <option v-for="service in services" :key="service.id" :value="service.id">
                    {{ service.name }}
                  </option>
                </select>
              </div>
              
              <div>
                <label for="date" class="block text-sm font-medium mb-2">Предпочтительная дата</label>
                <input 
                  v-model="form.date" 
                  type="date" 
                  id="date" 
                  class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                  required
                />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium mb-2">Дополнительная информация</label>
                <textarea 
                  v-model="form.message" 
                  id="message" 
                  rows="4" 
                  class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
              
              <div class="pt-4">
                <button type="submit" class="btn btn-primary w-full">
                  Отправить заявку
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Service Detail Modal -->
      <div v-if="selectedService" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/80" @click="selectedService = null"></div>
        
        <div class="relative w-full max-w-2xl bg-gray-900 rounded-lg overflow-hidden">
          <div class="p-6">
            <button @click="selectedService = null" class="absolute top-4 right-4 text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div class="mb-6">
              <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <component :is="selectedService.icon" class="h-6 w-6 text-white" />
              </div>
              <h3 class="text-2xl font-bold mb-2">{{ selectedService.name }}</h3>
              <p class="text-gray-300 mb-4">{{ selectedService.description }}</p>
              <div class="text-green-400 font-bold mb-4">от {{ selectedService.price }} ₽</div>
            </div>
            
            <div class="mb-6">
              <h4 class="text-lg font-bold mb-4">Что входит в услугу:</h4>
              <ul class="space-y-2">
                <li v-for="(item, index) in selectedService.includes" :key="index" class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  {{ item }}
                </li>
              </ul>
            </div>
            
            <div class="flex justify-end">
              <button @click="bookService(selectedService)" class="btn btn-primary">
                Записаться
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { 
    Wrench, 
    Battery, 
    Zap, 
    RefreshCw, 
    Shield, 
    Settings 
  } from 'lucide-vue-next';
  
  // Services
  const services = ref([
    {
      id: 'basic',
      name: 'Базовое обслуживание',
      description: 'Проверка основных систем и настройка электровелосипеда',
      price: '3 500',
      icon: Wrench,
      includes: [
        'Проверка электрической системы',
        'Настройка переключателей',
        'Проверка тормозной системы',
        'Смазка цепи',
        'Проверка давления в шинах',
        'Затяжка болтов и гаек'
      ]
    },
    {
      id: 'battery',
      name: 'Диагностика аккумулятора',
      description: 'Полная проверка состояния и обслуживание аккумулятора',
      price: '2 500',
      icon: Battery,
      includes: [
        'Проверка емкости аккумулятора',
        'Диагностика контроллера заряда',
        'Очистка контактов',
        'Проверка зарядного устройства',
        'Калибровка системы управления батареей',
        'Рекомендации по увеличению срока службы'
      ]
    },
    {
      id: 'motor',
      name: 'Обслуживание двигателя',
      description: 'Диагностика и обслуживание электродвигателя',
      price: '4 500',
      icon: Zap,
      includes: [
        'Проверка работы двигателя',
        'Диагностика датчиков',
        'Проверка проводки',
        'Очистка системы охлаждения',
        'Настройка мощности',
        'Калибровка датчика крутящего момента'
      ]
    },
    {
      id: 'seasonal',
      name: 'Сезонное обслуживание',
      description: 'Подготовка велосипеда к новому сезону или консервация',
      price: '5 000',
      icon: RefreshCw,
      includes: [
        'Полная диагностика всех систем',
        'Замена расходных материалов',
        'Обновление программного обеспечения',
        'Настройка всех компонентов',
        'Обработка антикоррозийными составами',
        'Рекомендации по хранению'
      ]
    },
    {
      id: 'warranty',
      name: 'Гарантийное обслуживание',
      description: 'Бесплатное обслуживание в рамках гарантийного срока',
      price: '0',
      icon: Shield,
      includes: [
        'Диагностика неисправностей',
        'Замена неисправных компонентов',
        'Настройка систем',
        'Проверка работоспособности',
        'Обновление программного обеспечения',
        'Консультация по эксплуатации'
      ]
    },
    {
      id: 'custom',
      name: 'Индивидуальная настройка',
      description: 'Настройка велосипеда под индивидуальные потребности',
      price: '7 500',
      icon: Settings,
      includes: [
        'Настройка геометрии под рост и вес',
        'Индивидуальная настройка мощности',
        'Оптимизация расхода энергии',
        'Настройка режимов работы',
        'Установка дополнительного оборудования',
        'Персональные рекомендации по эксплуатации'
      ]
    }
  ]);
  
  // Service Process
  const serviceProcess = ref([
    {
      title: 'Запись',
      description: 'Оставьте заявку на сайте или позвоните нам для записи на удобное время'
    },
    {
      title: 'Диагностика',
      description: 'Наши специалисты проведут полную диагностику вашего электровелосипеда'
    },
    {
      title: 'Обслуживание',
      description: 'Выполнение необходимых работ с использованием профессионального оборудования'
    },
    {
      title: 'Проверка',
      description: 'Финальная проверка всех систем и выдача рекомендаций по эксплуатации'
    }
  ]);
  
  // FAQs
  const faqs = ref([
    {
      question: 'Как часто нужно обслуживать электровелосипед?',
      answer: 'Рекомендуется проводить базовое обслуживание каждые 500-1000 км пробега или раз в 3-4 месяца активного использования. Полное техническое обслуживание рекомендуется проводить раз в год или каждые 3000 км.'
    },
    {
      question: 'Сколько времени занимает обслуживание?',
      answer: 'Базовое обслуживание обычно занимает 1-2 часа. Полное техническое обслуживание может занять от 3 до 5 часов в зависимости от состояния велосипеда и необходимых работ.'
    },
    {
      question: 'Можно ли оставить велосипед на несколько дней?',
      answer: 'Да, вы можете оставить велосипед в нашем сервисном центре. Мы предоставляем услугу хранения на время обслуживания. После завершения работ мы свяжемся с вами для согласования времени получения.'
    },
    {
      question: 'Что делать, если велосипед на гарантии?',
      answer: 'Если ваш электровелосипед находится на гарантии, обязательно сообщите об этом при записи. Гарантийное обслуживание проводится бесплатно при наличии гарантийного талона и соблюдении условий эксплуатации.'
    },
    {
      question: 'Можно ли обновить программное обеспечение?',
      answer: 'Да, мы предоставляем услугу обновления программного обеспечения для электровелосипедов. Это может улучшить производительность, энергоэффективность и исправить известные ошибки.'
    }
  ]);
  
  // Form
  const form = ref({
    name: '',
    phone: '',
    email: '',
    bikeModel: '',
    serviceType: '',
    date: '',
    message: ''
  });
  
  // State
  const activeFaq = ref(null);
  const selectedService = ref(null);
  
  // Methods
  function toggleFaq(index) {
    if (activeFaq.value === index) {
      activeFaq.value = null;
    } else {
      activeFaq.value = index;
    }
  }
  
  function selectService(service) {
    selectedService.value = service;
  }
  
  function bookService(service) {
    form.value.serviceType = service.id;
    selectedService.value = null;
    scrollToForm();
  }
  
  function scrollToForm() {
    const element = document.getElementById('service-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  function submitForm() {
    // In a real app, this would submit the form data to a server
    alert('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
    form.value = {
      name: '',
      phone: '',
      email: '',
      bikeModel: '',
      serviceType: '',
      date: '',
      message: ''
    };
  }
  </script>