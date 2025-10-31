# Fastify Todo API

## Опис
API для керування тасками з аутентифікацією через JWT, MongoDB, Fastify (JS).

## Основні можливості
- Реєстрація та вхід (email, username, password)
- Захищені роути для тасок (CRUD)
- Пагінація тасок (offset/limit)
- MongoDB через URI

## Запуск
1. Встановіть залежності:
   ```bash
   npm install
   ```
2. Створіть файл `.env` з вашим MongoDB URI та JWT секретом:
   ```env
   MONGODB_URI=ваш_урі
   JWT_SECRET=ваш_секрет
   ```
3. Запустіть сервер:
   ```bash
   npm start
   ```

## Структура
- `/routes` — роутинг
- `/models` — моделі Mongoose
- `/controllers` — логіка
- `/plugins` — підключення MongoDB, JWT
- `index.js` — точка входу
