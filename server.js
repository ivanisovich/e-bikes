const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3005;

// Пути к файлам для хранения данных
const PRODUCTS_FILE = path.join(__dirname, 'products.json');
const CATEGORIES_FILE = path.join(__dirname, 'categories.json');

// Функции для чтения и записи JSON
function readJSON(file) {
  if (!fs.existsSync(file)) return null;
  const data = fs.readFileSync(file, 'utf8');
  try {
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Если файлов нет, создаём их с начальной структурой
if (!fs.existsSync(PRODUCTS_FILE)) {
  writeJSON(PRODUCTS_FILE, []);
}
if (!fs.existsSync(CATEGORIES_FILE)) {
  // Дефолтные категории
  writeJSON(CATEGORIES_FILE, ["электровелосипеды", "аксессуары"]);
}

// Функция для парсинга технических характеристик (каждая строка в формате "Ключ: Значение")
function parseSpecifications(text) {
  if (!text) return [];
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length);
  const specs = [];
  for (const line of lines) {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts.shift().trim();
      const value = parts.join(':').trim();
      specs.push({ key, value });
    }
  }
  return specs;
}

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ===== Публичное API =====

// Получение списка товаров
app.get('/products', (req, res) => {
  const products = readJSON(PRODUCTS_FILE) || [];
  res.json(products);
});

// Получение товара по id
app.get('/products/:id', (req, res) => {
  const products = readJSON(PRODUCTS_FILE) || [];
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Товар не найден" });
  res.json(product);
});

// Получение списка категорий
app.get('/categories', (req, res) => {
  const categories = readJSON(CATEGORIES_FILE) || [];
  res.json(categories);
});

// Добавление товара (используется админкой)
app.post('/products/add', (req, res) => {
  const { name, description, price, images, category, specifications } = req.body;
  let imagesArray = [];
  if (images) {
    if (typeof images === 'string') {
      imagesArray = images.split(/\r?\n/).map(s => s.trim()).filter(s => s);
    } else {
      imagesArray = images;
    }
  }
  const specs = parseSpecifications(specifications);
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    priceValue: parseFloat(price),
    images: imagesArray,
    category,
    specifications: specs
  };
  const products = readJSON(PRODUCTS_FILE) || [];
  products.push(newProduct);
  writeJSON(PRODUCTS_FILE, products);
  res.json({ message: "Товар добавлен", product: newProduct });
});

// Редактирование товара
app.post('/products/edit/:id', (req, res) => {
  const { name, description, price, images, category, specifications } = req.body;
  let products = readJSON(PRODUCTS_FILE) || [];
  let product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Товар не найден" });
  
  let imagesArray = [];
  if (images) {
    if (typeof images === 'string') {
      imagesArray = images.split(/\r?\n/).map(s => s.trim()).filter(s => s);
    } else {
      imagesArray = images;
    }
  }
  const specs = parseSpecifications(specifications);
  
  product.name = name;
  product.description = description;
  product.price = price;
  product.priceValue = parseFloat(price);
  product.images = imagesArray;
  product.category = category;
  product.specifications = specs;
  
  writeJSON(PRODUCTS_FILE, products);
  res.json({ message: "Товар обновлён", product });
});

// Удаление товара (опционально)
app.delete('/products/:id', (req, res) => {
  let products = readJSON(PRODUCTS_FILE) || [];
  const newProducts = products.filter(p => p.id !== req.params.id);
  writeJSON(PRODUCTS_FILE, newProducts);
  res.json({ message: "Товар удалён" });
});

app.listen(3005, '0.0.0.0', () => {
  console.log(`Server running on port 3005`);
});
