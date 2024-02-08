# Poldo's CS50 Final Project

#### Video Demo:  <URL HERE>

#### Description:
This is a task list application, but it goes beyond basic functionality by offering extensive customization options for tasks, such as adding colors or delivery times/deadlines. Additionally, tasks are displayed on a calendar, providing users with awareness of their available time. Furthermore, tasks can have subtasks, each with its own deadlines.

The application's structure is straightforward, responsive, and clean.

#### Installation Instructions
1. Once you have downloaded the project, run the following command in your terminal:

    ```
    npm install
    ```
2. To work with tasks, you'll need to create a MongoDB collection and set it as `DATABASE_URL` in a `.env` file as an environment variable. Example:

    ```
    DATABASE_URL="direction-to-your-collection"
    ```
3. After setting up the environment variable, start the development server by running:

    ```
    npm run dev
    ```

    or
    ```
    yarn dev
    ```

    or
    ```
    pnpm dev
    ```

    or
    ```
    bun dev
    ```
4. To use Prisma, you'll need to initialize Prisma and set up the database schema. Run the following command to initialize Prisma:

    ```
    npx prisma init
    ```

    This command will create the necessary files and folders for working with Prisma in the project.
5. Finally, generate the Prisma client by running:

    ```
    npx prisma generate
    ```

    This will generate the Prisma client based on your database schema, allowing you to interact with the database in your code.

With these steps completed, the project should be set up and ready to use.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Software used
- React: React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the UI when the data changes. React's component-based architecture makes it easier to manage the application's state and build interactive web applications.
- Prisma: Prisma is an open-source database toolkit for Node.js and TypeScript applications. It provides an ORM (Object-Relational Mapping) layer that simplifies database operations and allows developers to interact with databases using a type-safe and fluent API. Prisma supports multiple databases, including PostgreSQL, MySQL, and SQLite.
- Next.js: Next.js is a React framework for building server-side rendered (SSR) and statically generated web applications. It provides built-in features such as automatic code splitting, hot module replacement, and server-side rendering, which improve performance and SEO (Search Engine Optimization). Next.js also offers support for TypeScript, CSS Modules, and API routes, making it a powerful tool for building modern web applications.
- MongoDB: MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It is known for its scalability, flexibility, and performance, especially for applications with large amounts of unstructured data or complex data models. MongoDB's document model allows developers to store and retrieve data in a way that closely matches the application's data structures, making it easy to work with data in modern web applications.
- Tailwind CSS: Tailwind CSS is a utility-first CSS framework that provides pre-built CSS classes for building custom and responsive user interfaces. It allows developers to rapidly prototype and style web applications by composing utility classes directly in HTML markup. Tailwind CSS promotes a functional and atomic CSS approach, where styles are defined as single-purpose utility classes, making it easy to maintain and scale CSS codebases in large projects.