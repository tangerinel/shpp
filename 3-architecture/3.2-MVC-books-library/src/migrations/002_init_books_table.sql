
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `year` INTEGER NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  image_url VARCHAR(255) UNIQUE
);

INSERT IGNORE INTO books(title, `description`, `year`, image_url)
VALUES
('СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА','Лекции и практикум по программированию на Си++ ',2001,'22.jpg'),

(
  'ПРОГРАММИРОВАНИЕ НА ЯЗЫКЕ GO',
  'Данная книга представляет собой одновременно и учебник,
и справочник, сводя воедино все знания, необходимые для того, чтобы продолжать освоение Go, 
думать на Go и писать на нем высокопроизводительные программы. Автор приводит множество сравнений идиом программирования,
демонстрируя преимущества ',
  2016,
  '23.jpg'
 ),

(
  'ТОЛКОВЫЙ СЛОВАРЬ СЕТЕВЫХ ТЕРМИНОВ И АББРЕВИАТУР',
  'ТОЛКОВЫЙ СЛОВАРЬ СЕТЕВЫХ ТЕРМИНОВ И АББРЕВИАТУР',
  2002,
  '25.jpg'
),

(
  'Python и анализ данных',
  'Книгу можно рассматривать как современное практическое введение в разработку научных приложений на Python,
   ориентированных на обработку данных.',
   2013,
   '26.jpg'
),

('Философия JAVA','Классика Computer Science',2020,'27.jpg'),

('Алгоритмы. Построение и анализ','Алгоритмы построение и анализ',1989,'29.jpg'),
(
  'JavaScript.Карманный справочник',
  'В книге представлены наиболее важные сведения о синтаксисе языка
   и показаны примеры его практического применения.',
   2019,
   '31.jpg'
),

(
  'Адаптивный код на C#',
  'Проектирование классов и интерфейсов,шаблоны и принцыпы SOLID',
  2015,
  '32.jpg'
);