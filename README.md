## Pretty JSON 📝

A simple to use tool to prettify your JSON code and retrieve past data.

## Instructions to Run & Use

```bash
npm i
```

This will get all dependencies installed on your machine to make the code compatible with 3rd party packages used.

#### Setting up PostgreSQL

Next, we need to set up the postgreSQL backend. Download the postgreSQL app and create a new database. _Instructions on how to do so at the end of this document._

Once the database is created, change the **'DATABASE_URL'** variable in the **.env** file to your new database. It will be in the format: "postgresql://user:password@localhost:5432/databaseName"

As an example mine is: "postgresql://rishab@localhost:5432/prettyjson"

_Note: Feel free to choose the database of your choice, using Prisma, it is adaptable to many Database Engines including MySQL and Mongo_

#### Running the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Using PrettyJSON

The UI is very simple and overall easy to use. Paste your ugly JSON code into the text area, click "Prettify" and watch it get beautified! If the JSON you entered is invalid, an error will be thrown.

To get the most recent code you prettified, click the "Get Recent JSON" button and it will appear below.

## Frameworks/Packages Used

1. Next.js
2. Typescript
3. PostgreSQL
4. TailwindCSS
5. Prisma
6. Radix UI
7. Axios

### Setup PostgreSQL Database

1. Install PostgreSQL App
2. In the app double click the pre-existing database named 'postgres'. This will open a terminal prompt automatically.
3. In the terminal use the command **CREATE DATABASE name;**
4. Click Start Server in the app

\
You are now ready to use PostgreSQL on your machine!
