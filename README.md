Запустить приложение: <br />
  docker compose up -d <br />
Приложение запускается на 3000 порту.<br />
<br />
PgAdmin запускается на 5050 порту. Для входа в pgAdmin нужны данные:<br />
  Логин: pgadmin4@pgamin.org<br />
  Пароль: admin<br />
<br />
Postgres запускается на 5432 порту. Для доступа к БД db_appeals нужны данные:
  Логин: postgres
  Пароль: password
  Хост: 172.20.0.2

/////////////////////////////////////////////////////////
Создать обращение: POST /appeal 
  Request body schema: {topic: string, text: string}
  Response body schema: {message: string, appeal: Appeal}
_________________________________________________________
Взять обращение в работу: PUT /appeal/take/:id
  Params:
    id - Идентификатор обращения
  Response body schema: {message: string, appeal: Appeal}
_________________________________________________________
Завершить обработку обращения: PUT /appeal/resolve/:id
  Params:
    id - Идентификатор обращения
  Request body schema: {text: string}
  Response body schema: {message: string, appeal: Appeal}
_________________________________________________________
Отмена обращения: PUT /appeal/reject/:id
  Params:
    id - Идентификатор обращения
  Request body schema: {reason: string}
  Response body schema: {message: string, appeal: Appeal}
_____________________________________________________________________________________________________________________
Получить список обращений с возможность фильтрации по 
конкретной дате и по диапазону дат: GET /appeal/find?first=YYYY.MM.DD&second=YYYY.MM.DD // Параметр second опционален
  Response body schema: {message: string, appeal: Appeal[]}
_____________________________________________________________________________________
Отменить все обращения, которые находятся в статусе "в работе": PUT /appeal/rejectAll
  Request body schema: {reason: string}
  Response body schema: {message: string, appeals: Appeal[]}
