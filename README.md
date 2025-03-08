# Импульс Т1 (3 место)

*MISIS x BGITU*

Team Members:

1. **Дмитрий Коноплянников** - Backend, DevOps
2. **Виктория Гайлитис** - Backend
3. **Дарья Короленко** - Design
4. **Ильдар Ишбулатов** - Frontend
5. **Кирилл Рыжичкин** - ML Engineer

Презентация: [тык](https://disk.yandex.ru/i/HmzdRS5ghq--1A)

Веб-сервис: [тык](http://51.250.42.179:3000)

Swagger API: [тык](http://51.250.42.179:8000/api/docs)

## Кейс "Окно знаний – цифровой ассистент базы знаний"

> Создайте платформу, которая позволит пользователям на основе собственной базы знаний разрабатывать окна взаимодействия с ассистентом.

## Предложенное решение

### Блок-схема всего решения:

![scheme](images/scheme.jpg)

## Полностью кастомизируемый конструктор AI-ассистентов:

- загрузка любой базы знаний (различные сервисы и файлы в любом количестве)
- выбор любой LLM-модели с huggingface (предлагаем популярные варианты, а также даем возможность выбрать собственную модель)
- настройка температуры LLM
- выбор любого ретривера с huggingface (также предлагаем популярные варианты, а также даем возможность выбрать собственный ретривер)
- выбор роли ассистента (например, "разработчик", "аналитик", "ресерчер" и т.д.) с уже заготовленными системными промптами под эти роли
- создание собственной роли ассистента (задание своего системного промпта)
- экспорт ассистента в 3 форматах: API, pop-up, service (также кастомизация цветов и названий ассистента на этом этапе)
- последующее редактирование ассистентов после их сохранения (например, можно добавить новые источники в базу знаний или удалить существующие, сменить модель, ретривер, обновить параметры модели или системный промпт)

### Поддерживаемые форматы источников:

#### Документы:

- pdf
- txt
- word (doc, docx)
- csv
- html
- markdown (md)
- json
- xml
- excel (xls, xlsx)
- audio (mp3)
- images (jpeg, jpg, png, ...)

#### Сервисы:

- confluence
- notion
- github
- youtube
- any url

## Инструкция по запуску решения

### 1. Клонирование репозитория
Склонируйте репозиторий с помощью команды:
```bash
git clone https://github.com/Kin1599/impulse.git
cd impulse
```

### 2. Проверить установлено ли нужные программы:
Обязательно npm, node, postgresql (локально), docker

Докер на linux устанавливается через эти команды:
```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### 3. Заполняем env-зависимости по шаблонам
Берем нужные ключи

### 4. Запускаем docker compose
Открываем терминал и прописываем в корне проекта 
```
docker compose -f docker-compose-not-traefik.yml up --build -d
```

Если же у вас есть домен, то прописываем в .env корне проекта домен и запускаем уже в терминале команду: 
```
docker compose up --build -d
```

### 5. Переходим на сервер
Если есть домен, то переходим по нему и радуемся, иначе переходим по локальному адресу + указываем порт `:3000` для фронтенда и `:8000/api/docs` для перехода в `Swagger`
