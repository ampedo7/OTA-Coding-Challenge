<h1 align="center">
  <img alt="admin-portal" title="admin-portal" src="https://via.placeholder.com/200?text=APP%20LOGO" width="200px" style="border-radius:100px"/>
</h1>

<h3 align="center">
 ADMIN PORTAL API made with Node, ExpressJS and Mysql2
</h3>

## Installation

```
  // 1 - Git Clone

  // 2 - Copy the .env.example and set the environment variables
  cp .env.example .env

  // 3 - Installing the dependencies
  yarn install

  // 4 - Run the application (Be sure to have the API running locally)
  yarn start

```

yarn db:migrate
yarn db:seedall

---

## Database: Migration / Seeder

```
  // 1 - Create New Model with Migration
  yarn db:make-model --name User --attributes first_name:string,last_name:string --underscore
                            ^--^              ^-------^  ^--^
                              |                   |        |
                              |                   |        +-------> Data type
                              |                   +-------> column name
                              +-------> Model Name

  // 2 - Create Skeleton Migration without Model
  yarn db:make-migration --name migrate-create-user

  // 3 - Running Migrations
  yarn db:migrate

  // 4 - Running All Seeds
  yarn db:seedall

  // 5 - Undo all seed
  yarn db:seedall-undo

  // 6 rollback migration
  db:migrate-rollback --name  20200508030410-create-calendar-event.js
```

//making seeder
yarn db:make-seeder --name seeder-name

Read sequelize documentation
[https://sequelize.org/docs/v6/getting-started/](https://sequelize.org/docs/v6/getting-started/)

---
