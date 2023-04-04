
CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL UNIQUE
);

INSERT IGNORE INTO authors(`name`)
VALUES
('Андрей Богуславский'),
('Марк Саммерфильд'),
('Cisco Systems'),
('Уэс Маккинни'),
('Брюс Эккель'),

('Томас Кормен'),
('Чарльз Лейзерсон'),
('Рональд Риверст'),
('Клиффорд Штайн'),

('Дэвид Фленаган'),
('Гэрри Маклин Холл');