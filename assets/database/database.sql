CREATE DATABASE IF NOT EXISTS databaseToDo;
USE databaseToDo;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Tabela de listas de tarefas
CREATE TABLE IF NOT EXISTS list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    isfinished BOOLEAN DEFAULT 0,
    userid INT,
    FOREIGN KEY (userid) REFERENCES user(id) ON DELETE CASCADE
);
