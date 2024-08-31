# Projeto de Medidor de Água e Luz

Este projeto é uma aplicação backend desenvolvida com Node.js, Express e Prisma. Ele gerencia a leitura individualizada de consumo de água e gás, utilizando IA para obter medições através da foto de um medidor. A aplicação é dockerizada e inclui uma configuração para Docker Compose.

## Tecnologias

- **Node.js**: Versão 20.16.0
- **Express**: Framework para criar APIs
- **Prisma**: ORM para interagir com o banco de dados PostgreSQL
- **Docker**: Para criar e gerenciar contêineres
- **Docker Compose**: Para configurar e executar múltiplos contêineres
- **TypeScript**: Para garantir tipagem estática e melhor manutenção do código
- **Zod**: Para validação de dados

## Pré-requisitos

- **Docker** e **Docker Compose** instalados
- **Node.js** e **npm** instalados (para desenvolvimento local)

## Configuração

1. **Clone o Repositório**

```bash
git@github.com:claudioares/shopper-teste-tecnico.git
```
2. **Crie um Arquivo .env**

Na raiz do projeto, crie um arquivo .env com a variável de ambiente GEMINI_API_KEY:
```bash
GEMINI_API_KEY=<sua-chave-da-api>
```
Adicione esta variável de ambiente:
```bach
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydatabase"
```

3. **Instale as dependencias**

```bash
npm install
```

4. **Rode o servidor**

```bash
npm run dev
```
Teste a aplicação usando Insomnia, SoapUI, Thunder Client ou qualquer ferramenta para testes de APIs.

## Endpoints

**POST /upload**
Recebe uma imagem em base64 e retorna a medida lida pela API Gemini.

Request Body
```bash
{
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" ou "GAS"
}
```
Response Body
***200 OK***
```bash
{
  "image_url": "string",
  "measure_value": integer,
  "measure_uuid": "string"
}
```

***400 Bad Request***
```bash
{
  "error_code": "INVALID_DATA",
  "error_description": "<descrição do erro>"
}
```

***409 Conflict***
```bash
{
  "error_code": "DOUBLE_REPORT",
  "error_description": "Leitura do mês já realizada"
}
```

## Testes
Teste a API localmente utilizando ferramentas como Postman para garantir que tudo está funcionando conforme o esperado.

