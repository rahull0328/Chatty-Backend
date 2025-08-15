# Chatty - Backend

Chatty Backend provides the backend APIs for a real-time chat application, handling user authentication, messaging, and real-time updates using `socket.io`. It is built with `Node.js` and `Express.js`, utilizing `MongoDB` as the database.

## Features
- User authentication (registration & login)
- Secure password hashing using bcrypt
- JWT-based authentication
- Real-time messaging using `socket.io`
- Message storage in MongoDB
- RESTful API structure with controllers and models

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- Socket.io
- Bcrypt (for password hashing)
- JSON Web Token (JWT) for authentication

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/rahull0328/chatty-backend.git
   cd chatty-backend
   ```

2. Install dependencies:
   ```sh
   npm install i
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```sh
   npm run dev
   ```

## Socket.io Integration
- Real-time messaging with `socket.io`
- Users join rooms based on chat IDs
- Real-time message broadcasting to participants

## Folder Structure
```
chatty-backend/
│── models/        # Mongoose models
│── controllers/   # API controllers
│── routes/        # Express routes
│── config/        # Database configuration
│── index.js      # Entry point
│── .env           # Environment variables
│── package.json   # Dependencies
```

## Contributing
We welcome contributions to the Chatty project! To contribute:

- 🍴 Fork the repository.
- 🌱 Create a new branch (git checkout -b feature/your-feature).
- 💻 Commit your changes (git commit -am 'Add new feature').
- 📤 Push to your branch (git push origin feature/your-feature).
- 🤝 Open a pull request.

## License
This project is licensed under the MIT License.

---


## 👨‍💻 Author

**Rahul Mehta**  
 Full-Stack Developer

- GitHub: [@rahull0328](https://github.com/rahull0328)  
- LinkedIn: [Rahul Mehta](https://www.linkedin.com/in/rahull0328)  
---
Enjoy building with Chatty Backend! 
---