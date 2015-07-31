Demo: http://quiz.dev.megor.ru/barcelona/

#Общая структура проекта

/apps/ - папка с готовыми построенными тестами
/bower/ - библиотеки
/data/ - папка для данных для тестов
/src/ - все сорцы приложения

#Методика сборки

Есть стандартные файлы + файлы какого-то определнного теста (например, собираем barcelona). В /src/ есть папка default - это стандартные компоненты. Внутри нее есть www и app. Www это по сути assets - все содержимое из этой папки потом наложится на простроенное приложение. Удобно таким образом накрывать новый index.html, какие-то свои файлы, добавки, исправления и прочее. App - сорцы angular приложения. Сначала копируются все файлы из /src/default/app, попадают в /tmp/. Далее все файлы из /src/TEST_ID/app попадают в /tmp/, тем самым перепиписывая дефолтные. Далее из папки /tmp/ все это мерджится, превращается в шаблоны, скрипты минифицируются и затем всё оказывается в папке построенного приложения.

Итак, сама сборка, где TEST_ID - название теста, которое должно совыпадать с файлом в папке /data/TEST_ID.json:

	gulp build --id TEST_ID
 
Есть watch task, без livereload

	gulp serve --id TEST_ID

Что еще важно - весь объект данных теста внедряется в ангуляр зависимостью Quiz, инжектим и пользуемся чем хотим.