CREATE DATABASE todo_app;

USE todo_app;

CREATE TABLE todos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed TINYINT(1) NOT NULL DEFAULT 0
);

----------------------------------------------------

-- 创建数据库
CREATE DATABASE todo;

-- 切换到新创建的数据库
USE todo;

-- 创建 todos 表
CREATE TABLE todos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed TINYINT(1) NOT NULL DEFAULT 0
);

-- 插入示例数据
INSERT INTO todos (title, completed) VALUES 
('Buy groceries', 0),
('Read a book', 0),
('Complete homework', 1);

-- 查询数据
SELECT * FROM todos;
