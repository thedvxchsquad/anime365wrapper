<p align="center">
  <img src="https://raw.githubusercontent.com/thedvxchsquad/anime365wrapper/master/.github/logo.png" alt="Anime365Wrapper Logo" width="200">
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/anime365wrapper"><img src="https://img.shields.io/npm/v/anime365wrapper.svg?style=flat-square" alt="NPM version"></a>
  <a href="https://www.npmjs.com/package/anime365wrapper"><img src="https://img.shields.io/npm/dt/anime365wrapper.svg?style=flat-square" alt="NPM downloads"></a>
</p>

> **Anime365Wrapper** — это обёртка для API [anime365.ru (smotret-anime)](https://smotret-anime.online/api) для Node.js, написанная на TypeScript.
>
> **Требования:** Node.js 10+

| 📖 [TSDocs](https://tsdocs.dev) | 🛠 [Issues & Feature Requests](https://github.com/thedvxchsquad/anime365wrapper/issues) |

## Установка

```bash
npm i anime365wrapper
yarn add anime365wrapper
pnpm add anime365wrapper
```

## Использование

В пакете предусмотрены два основных класса для работы с API:

- **SmotretAnimeAPI** — основной класс для взаимодействия с API.
- **UserSession** — класс для удобной работы с сессией и авторизацией.

### Работа с SmotretAnimeAPI

Импортируйте класс и создайте экземпляр, передав базовый URL и User-Agent (опционально можно задать access_token).

```javascript
// ESM / TypeScript
import { SmotretAnimeAPI } from 'anime365wrapper';
// или CommonJS
// const { SmotretAnimeAPI } = require('anime365wrapper');

const api = new SmotretAnimeAPI(
  'https://smotret-anime.online/api', // базовый URL API
  'Anime365Wrapper/1.0'               // ваш User-Agent
);

// Пример авторизации
api.login('your_email@example.com', 'your_password')
  .then(token => {
    console.log('Access token:', token);
    // Теперь можно выполнять запросы, используя токен
  })
  .catch(console.error);

// Пример запроса списка переводов (feed может быть 'recent', 'id' или 'all')
api.getTranslations('recent')
  .then(translations => {
    console.log('Список переводов:', translations);
  })
  .catch(console.error);
```

### Работа с UserSession

Класс **UserSession** предоставляет упрощённый способ работы с API, автоматически сохраняя access_token после авторизации.

```javascript
import { UserSession } from 'anime365wrapper';

const session = new UserSession();

// Авторизация и сохранение токена
session.login('your_email@example.com', 'your_password')
  .then(token => {
    console.log('Успешный логин, token:', token);
    return session.getTranslations('recent');
  })
  .then(translations => {
    console.log('Полученные переводы:', translations);
  })
  .catch(console.error);
```

## API Методы

### SmotretAnimeAPI

- **constructor(baseUrl?: string, userAgent?: string, accessToken?: string)**  
  Инициализирует API-обёртку. По умолчанию `baseUrl` равен `https://smotret-anime.online/api`, а `userAgent` — `Anime365Wrapper/1.0`.

- **setAccessToken(token: string): void**  
  Устанавливает или обновляет access_token для последующих запросов.

- **login(email: string, password: string): Promise\<string\>**  
  Производит авторизацию по email и паролю. При успешном логине сохраняет и возвращает access_token.

- **getTranslations(feed?: 'recent' | 'id' | 'all', afterId?: number): Promise\<Translation[]\>**  
  Получает список переводов. Параметр `feed` задаёт тип запроса, а `afterId` позволяет пагинировать результаты.

- **getTranslationById(id: number): Promise\<Translation\>**  
  Запрашивает информацию о конкретном переводе по его ID.

- **getTranslationEmbed(id: number): Promise\<EmbedTranslation\>**  
  Получает данные для встраивания видео перевода.

- **getSeriesList(params?: object): Promise\<Series[]\>**  
  Получает список аниме (серий) с возможностью передачи параметров (например, поиск по названию).

- **getSeriesById(id: number): Promise\<Series\>**  
  Получает информацию об аниме по указанному ID.

- **getEpisodeById(id: number): Promise\<Episode\>**  
  Получает данные о конкретном эпизоде.

- **getCurrentUser(): Promise\<User\>**  
  Возвращает информацию о текущем пользователе (при наличии авторизации).

### UserSession

- **login(email: string, password: string): Promise\<string\>**  
  Выполняет авторизацию и сохраняет access_token для дальнейшего использования.

- **getTranslations(feed?: 'recent' | 'id' | 'all', afterId?: number): Promise\<Translation[]\>**  
  Прокси-метод для получения списка переводов через экземпляр SmotretAnimeAPI.

## Технические детали

- **Сборка проекта:**  
  Пакет написан на TypeScript. Перед публикацией рекомендуется запускать сборку:
  ```bash
  npm run build
  ```

- **Тестирование:**  
  Запуск тестов осуществляется через:
  ```bash
  npm test
  ```

- **Поля модели:**  
  В проекте используются следующие модели: `ApiResponse`, `EmbedTranslation`, `Episode`, `Series`, `Translation` и `User`. Они описаны в папке `/src/models` и отражают структуру данных, возвращаемых API.

## Документация

Для получения документации по API Anime365 Вам необходимо обратиться к ним на почту с просьбой предоставить документацию.