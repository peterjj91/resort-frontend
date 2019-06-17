Шаблон верстки
========

Перед началом работы рекоментудется посетить [страницу в wiki](https://sites.google.com/a/future-group.ru/instructions/razrabotka/verstka)

[Документация по самому шаблону](https://sites.google.com/a/future-group.ru/instructions/razrabotka/verstka/dokumentacia-po-sablonu-verstki)

### Зависимости
```bash
npm i -g webpack || yarn add global webpack
npm i			 || yarn
```

### Сборка
Девелоп сборка c `browser-sync`:
```bash
npm run build:dev  || yarn build:dev
```
Продакшн сборка:
```bash
npm run build:prod || yarn build:prod
```

### Релиз
Релиз на сервер:
```bash
yarn sftp
```

Сборка + релиз:
```bash
npm run release || yarn release
```
