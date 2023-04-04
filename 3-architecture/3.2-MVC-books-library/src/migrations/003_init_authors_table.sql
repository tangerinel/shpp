
CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  second_name  VARCHAR(255) NOT NULL
);

INSERT IGNORE INTO authors(first_name, second_name)
VALUES
('Андрей','Богуславский'),
('Марк', 'Саммерфильд'),
('Cisco','Systems'),
('Уэс','Маккинни'),
('Брюс','Эккель'),

('Томас','Кормен'),
('Чарльз','Лейзерсон'),
('Рональд','Риверст'),
('Клиффорд','Штайн'),

('Дэвид','Фленаган'),
('Гэрри Маклин','Холл');