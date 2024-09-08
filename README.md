# Task Management App
A web application for managing tasks built with the MERN stack (MongoDB, Express.js, React.js, and Node.js).

### Features
<ul>
  <li>User authentication (register, login, logout)</li>
  <li>Create, read, update, and delete tasks</li>
  <li>Search task, filter task</li>
</ul>

### Technologies Used
<ul>
  <li>Front-end: React.js, TypeScript, React Router, TanStack Query, React Hook Form, Axios, Tailwind CSS</li>
  <li>Back-end: Node.js, Express.js, JWT (JSON Web Tokens), Bcrypt</li>
  <li>Database: MongoDB, Mongoose</li>
</ul>

### Installation
1. Clone the repository:
      `git clone https://github.com/your-username/task-management-app.git`
   
2. Install dependencies for client:
    ```bash
      cd task-management-app
      cd client
      npm install
   ```

3. Install dependencies for server:
    ```bash
      cd task-management-app
      cd server
      npm install
   ```

4. Set up environment variables:
  <ul>
    <li>Create one .env file inside <code>client</code> and one inside <code>server</code>.</li>
    <li>Add the variables as mentioned inside <code>.env.sample</code></li>
  </ul>

5. Start the development server:
   
   ```bash
       cd client
       npm run dev

       #and

       cd server
       npm run dev
   ```
