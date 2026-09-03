# Vehicle Microservices

Projeto acadêmico desenvolvido utilizando arquitetura de microsserviços e comunicação orientada a eventos.

## Arquitetura

O sistema é dividido em dois microsserviços:

### Vehicle Registration

Responsável por:

- Cadastrar veículos
- Validar dados
- Persistir veículos
- Publicar eventos `vehicle.created`

Porta: `3001`

### Vehicle List

Responsável por:

- Consumir eventos `vehicle.created`
- Armazenar veículos
- Listar veículos
- Buscar veículos específicos
- Filtrar por marca e ano

Porta: `3002`

## Tecnologias

- Node.js
- Express
- MongoDB
- RabbitMQ
- Docker
- Docker Compose
- Swagger

## Executando

Clone o projeto:

git clone URL_DO_REPOSITORIO
cd vehicle-microservices
Execute:

docker compose up --build
APIs
Cadastro

POST:

http://localhost:3001/vehicles

Swagger:

http://localhost:3001/api-docs
Listagem

GET:

http://localhost:3002/vehicles

Swagger:

http://localhost:3002/api-docs
RabbitMQ

Management:

http://localhost:15672

Usuário:

admin

Senha:

admin