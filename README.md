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

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2. **Configure o banco de dados**:
   - Crie um banco de dados no MySQL.
   - Importe o arquivo `database.sql` para criar as tabelas necessárias.

3. **Configure a conexão com o banco de dados**:
   - No arquivo `db_connect.php`, configure as credenciais de acesso ao banco de dados.

4. **Execute o projeto**:
   - Coloque os arquivos do projeto no diretório do servidor web (ex: `htdocs` no XAMPP).
   - Acesse o projeto via navegador através de `http://localhost/nome-do-projeto`.

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

- Nome do Aluno: [Seu Nome]
- Disciplina: Teste e Qualidade de Software
- Instituição: [Nome da Instituição]
