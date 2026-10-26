# Millionaire KZ

Адаптивная викторина на React + Vite с вопросами на русском языке, казахским переключателем, призовой лестницей и подсказками.

## Запуск
`npm install`
`npm run dev`

## Cloudflare Pages
Build command: `npm run build`
Output directory: `dist`
D1 binding name: `DB`

## Cloudflare D1
Database name: `millionaire-kz-db`
Database ID: `6f4e9427-ca52-4a69-8946-8e4c69b20da2`
Схема таблиц находится в `schema.sql`. Примените её к D1 перед включением API.

Примечание: экран викторины работает как frontend; регистрация, онлайн-матчи и серверная проверка результатов требуют подключения API и настройки D1 binding.