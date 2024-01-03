# Project Setup Guide for Speer

Welcome to the Speer Note application

## Setup Instructions

### 1. Clone the Repository

```bash
    git clone <your_repository_url>
    cd <your_project_directory>
```

### 2. Install the dependencies
```bash
    npm install
```

### 3. Create a .env File
Create a .env file in the root directory and add the following:
```
    DB_USERNAME=<your_db_username>
    DB_PASSWORD=<your_db_password>
    DB_NAME=<your_db_name>
    DB_HOST=<your_db_host>
    DB_PORT=<your_db_port>
    JWT_SECRET=<your_jwt_secret>
```

### 4. Set up PostgreSQL Database
Run migrations and seed data if needed:

```bash
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
```

### 5. Run the Application
```bash
    npm start
```

### 6. Run Tests
```
    npm test
```


## Choice of Technologies

We've carefully selected the following technologies to power our project:

- **Express.js:** Lightweight, flexible, and widely used for building APIs.
- **PostgreSQL:** Robust relational database.
- **Passport.js:** Simple and widely used for authentication.
- **Sequelize:** Powerful ORM for PostgreSQL.
- **Elasticsearch or PostgreSQL Full Text Search:** Efficient for keyword-based search.
