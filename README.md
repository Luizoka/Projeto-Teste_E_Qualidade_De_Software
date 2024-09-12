# Projeto ToDo - Teste e Qualidade de Software

Este projeto foi desenvolvido como parte da disciplina de Teste e Qualidade de Software. Ele consiste em um sistema de Login/Cadastro que direciona os usuários a uma página de ToDo personalizada, onde cada usuário pode gerenciar suas próprias tarefas.

## Funcionalidades

- **Cadastro de Usuário**: Permite que novos usuários criem uma conta no sistema.
- **Login**: Usuários registrados podem fazer login para acessar suas tarefas.
- **Página ToDo Personalizada**: Após o login, os usuários são direcionados a uma página de ToDo onde podem adicionar, visualizar e marcar tarefas como concluídas. Cada usuário tem acesso apenas às suas próprias tarefas.

## Tecnologias Utilizadas

- **Frontend**:
  - HTML 5
  - CSS 3
  - JavaScript ES5

- **Backend**:
  - PHP 8.3.10
  - MySQL

## Estrutura do Projeto

- **Frontend**: 
  - **HTML/CSS**: Interface de usuário simples e responsiva.
  - **JavaScript**: Manipulação do DOM, gerenciamento de eventos e comunicação com o backend via Fetch API.

- **Backend**:
  - **PHP**: Processamento das requisições HTTP, conexão com o banco de dados e operações CRUD.
  - **MySQL**: Armazenamento de dados dos usuários e suas respectivas tarefas.

## Instalação e Configuração

### Pré-requisitos:

1. **XAMPP**:
   - Baixe e instale o XAMPP no seu sistema a partir do [site oficial](https://www.apachefriends.org/index.html).
   - Certifique-se de que os serviços **Apache** e **MySQL** estão ativos pelo painel de controle do XAMPP.

2. **MySQL e phpMyAdmin**:
   - Usaremos o **phpMyAdmin**, que já vem com o XAMPP, para configurar o banco de dados. Acesse-o em `http://localhost/phpmyadmin` após iniciar o XAMPP.

### Passos de Configuração:

1. **Clone o repositório** para o diretório correto:
    ```bash
    git clone https://github.com/Luizoka/Projeto-Teste_E_Qualidade_De_Software.git
    ```
   Coloque os arquivos do projeto na pasta:
   ```bash
   C:/xampp/htdocs/

   ## Configurar o banco de dados

1. **Abra o phpMyAdmin** (normalmente acessível em `http://localhost/phpmyadmin`).
2. **Crie um novo banco de dados** com o nome desejado.
3. **Importe o arquivo** `assets/database/database.sql` para o banco de dados criado. Esse arquivo contém todas as tabelas necessárias para o funcionamento do sistema.

## Configurar a conexão com o banco de dados

1. No arquivo `db_connect.php`, ajuste as credenciais de conexão ao MySQL:

    ```php
    $host = 'localhost';
    $dbname = 'nome_do_seu_banco';
    $username = 'root'; // Usuário padrão do XAMPP
    $password = ''; // Normalmente, sem senha no XAMPP por padrão
    ```

## Iniciar o servidor

1. No painel de controle do XAMPP, inicie o **Apache** e o **MySQL**.
2. Acesse o projeto via navegador em `http://localhost/Projeto-Teste_E_Qualidade_De_Software/index.html`.

## Como Usar

1. **Cadastro**:
    - Acesse a página de cadastro e insira as informações necessárias para criar uma conta.
2. **Login**:
    - Após o cadastro, faça login usando o nome de usuário e senha criados.
3. **Gerenciamento de Tarefas**:
    - Na página ToDo, adicione novas tarefas preenchendo o formulário e clique em "Adicionar Tarefa".
    - As tarefas serão listadas na página, permitindo que você marque como concluídas ou visualize as pendentes.

## Próximos Passos

- Implementar testes automatizados para garantir a qualidade do software.
- Melhorar a interface do usuário para uma experiência mais intuitiva.

## Contribuidores

- Nome do Aluno: Luiz Gabriel Pinto Lopes Rabelo
- Disciplina: Teste e Qualidade de Software
- Instituição: Universidade Federal do Oeste do Pará (UFOPA)

