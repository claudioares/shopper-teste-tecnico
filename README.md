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
3. **Instale Dependencias do Doccker**

```bash
docker compose up --build -d
```
3. **Rode o projeto em http://localhost:3333/**

```bash
http://localhost:3333/
```
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

**PATCH /confirm**
Responsável por confirmar ou corrigir o valor lido pelo LLM.

Request Body
```bash
{
  "measure_uuid": "string",
  "confirmed_value": integer
}
```
Response Body
***200 OK***
```bash
{
 “success”: true
}
```

***400 Bad Request***
```bash
{
  "error_code": "INVALID_DATA",
  "error_description": "<descrição do erro>"
}
```

***404 Conflict***
```bash
{
  "error_code": "MEASURE_NOT_FOUND",
  "error_description": "Leitura do mês já realizada"
}
```

***409 Conflict***
```bash
{
  "error_code":"CONFIRMATION_DUPLICATE",
  "error_description": "Leitura do mês já realizada"
}
```

**GET /<customer code>/list**
Responsável por listar as medidas realizadas por um determinado cliente.

Ex. {base url}/<customer code>/list?measure_type=WATER

Response Body
***200 OK***
```bash
{
   “customer_code”: string,
  “measures”: [
    {
    “measure_uuid”: string,
    “measure_datetime”: datetime,
    “measure_type”: string,
    “has_confirmed”:boolean,
    “image_url”: string
    },
    {
    “measure_uuid”: string,
    “measure_datetime”: datetime,
    “measure_type”: string,
    “has_confirmed”:boolean,
    “image_url”: string
    }
  ]
}
```

***400 Bad Request***
```bash
{
  "error_code": "INVALID_TYPE",
  "error_description": “Tipo de medição não permitida”
}
```

***404 Conflict***
```bash
{
  "error_code": "MEASURES_NOT_FOUND",
  "error_description": "Nenhuma leitura encontrada"
}
```


