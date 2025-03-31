<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>



# E-Commerce API with NestJS and Prisma

This project is a RESTful API for an e-commerce application built with NestJS, Prisma ORM, and PostgreSQL. It includes authentication, user management, product catalog, orders, and addressing functionality.

## Features

- **Authentication**: JWT-based authentication system
- **User Management**: Register, update, activate/deactivate users
- **Product Catalog**: CRUD operations for products with category management
- **Order Processing**: Create and manage orders with order items
- **Address Management**: User address storage and management

## Tech Stack

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [JWT](https://jwt.io/) - JSON Web Tokens for authentication
- [Jest](https://jestjs.io/) - Testing framework

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your database:
   - Create a PostgreSQL database
   - Update the 

.env

 file with your database connection string
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/your-db-name?schema=public"
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`.

## API Documentation

API documentation is available via Swagger UI at `/docs` endpoint when the server is running.

## Testing

This project includes both unit tests and end-to-end tests.

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Check test coverage
npm run test:cov
```

## Project Structure

- 

src

 - Main source code
  - 

modules

 - Feature modules (users, products, orders, etc.)
  - 

prisma

 - Prisma ORM configuration and service
- 

test

 - End-to-end tests
- 

prisma

 - Prisma schema and migrations

## Main Modules

- **Users**: User registration, profile management
- **Authentication**: Login, JWT handling
- **Products**: Product CRUD operations 
- **Categories**: Product categorization
- **Orders**: Order creation and management
- **Addresses**: User address management

## License

This project is MIT licensed.

oscar1223: tiene que ser un formato que pueda copiar y egar en el README.md

Workspace: Collecting workspace information

# E-Commerce API with NestJS and Prisma

This project is a RESTful API for an e-commerce application built with NestJS, Prisma ORM, and PostgreSQL. It includes authentication, user management, product catalog, orders, and addressing functionality.

## Features

- **Authentication**: JWT-based authentication system
- **User Management**: Register, update, activate/deactivate users
- **Product Catalog**: CRUD operations for products with category management
- **Order Processing**: Create and manage orders with order items
- **Address Management**: User address storage and management

## Tech Stack

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [JWT](https://jwt.io/) - JSON Web Tokens for authentication
- [Jest](https://jestjs.io/) - Testing framework

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your database:
   - Create a PostgreSQL database
   - Update the 

.env

 file with your database connection string
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/your-db-name?schema=public"
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`.

## API Documentation

API documentation is available via Swagger UI at `/docs` endpoint when the server is running.

## Testing

This project includes both unit tests and end-to-end tests.

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Check test coverage
npm run test:cov
```

## Project Structure

- 

src

 - Main source code
  - 

modules

 - Feature modules (users, products, orders, etc.)
  - 

prisma

 - Prisma ORM configuration and service
- 

test

 - End-to-end tests
- 

prisma

 - Prisma schema and migrations

## License

This project is MIT licensed.