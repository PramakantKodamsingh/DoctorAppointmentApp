ALL ABOUT THE PACKAGES INSTALLED :- in server.js

express:

Definition: Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications.
Use Case: It is used to build single-page, multi-page, and hybrid web applications, handling routing, middleware, and HTTP utility methods.

morgan:

Definition: Morgan is an HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application.
Use Case: It is commonly used for logging incoming requests in development and production environments to monitor and debug the application.

colors:

Definition: Colors is a library that allows you to add color and style to your Node.js console output.
Use Case: It is used to improve the readability of console logs by adding colors and styles to differentiate between various types of messages (e.g., errors, warnings, info).

dotenv:

Definition: Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
Use Case: It is used to manage application configuration, especially for sensitive information like API keys and database connection strings, without hardcoding them in the source code.

nodemon:

Definition: Nodemon is a utility that monitors for changes in your source code and automatically restarts the Node.js server.
Use Case: It is used during development to enhance productivity by eliminating the need to manually restart the server after every code change.

mongoose:

Definition: Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data.
Use Case: It is used to interact with MongoDB databases, defining schemas, and managing relationships between data, as well as providing built-in validation and type casting.

jsonwebtoken:

Definition: JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The jsonwebtoken library allows you to create and verify JWTs.
Use Case: It is used for authentication and authorization in web applications, enabling secure token-based authentication systems.

bcryptjs:

Definition: Bcryptjs is a library to help you hash passwords. It is a JavaScript implementation of the bcrypt password hashing function.
Use Case: It is used to securely hash and compare passwords, enhancing security by ensuring that passwords are not stored in plain text.

React Router DOM :-

React Router DOM is a library for routing in React applications. It allows you to create dynamic, single-page web applications with navigation capabilities without a full-page refresh. Key features include:

Axios:

Axios is a popular HTTP client library for making HTTP requests from the browser or Node.js. It's often used in React applications to fetch data from APIs. Key features include.

Ant Design (AntD):-

Ant Design (AntD) is a comprehensive UI library for building rich and interactive user interfaces in React. It offers a wide range of pre-designed components and a design system aimed at enterprise applications.

USE OF CUNCURRENTLY npm package:

first we have to install it.

Then client: "npm start --prefix ./client" :-

Purpose: Starts the client application located in the ./client directory.

Usage: npm run client
Details: The --prefix ./client flag tells npm to run the start script from the ./client directory. This is typically used to start a React application or any front-end project that has its own package.json and start script.

dev: "concurrently \"npm run server\" \"npm run client\""

Purpose: Runs both the server and client applications concurrently.
Usage: npm run dev
Details: The concurrently package is used to run multiple npm scripts simultaneously. In this case, it runs the server with Nodemon and the client start script at the same time. This is particularly useful for full-stack development where you need both the front-end and back-end servers running concurrently.

Json Web Token(jwt):Use HTTP-Only Cookies for Storing JWTs:

-->PublicRoutes and ProtectedRoutes are important things to lookover

VERIFICATION PROCESS:

Client Sends Token: The client includes the JWT in the HTTP request (usually in the Authorization header as a Bearer token).
Server Splits the Token: The server splits the JWT into its three parts: header, payload, and signature.
Server Recomputes the Signature: Using the header and payload, along with the secret key, the server recomputes the signature.
Comparison: The server compares the recomputed signature with the signature in the token.
Validation: If the signatures match, the token is considered valid. If they do not match, the token is rejected.
