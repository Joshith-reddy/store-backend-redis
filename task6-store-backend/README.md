# Store Backend API

A simple Store Backend REST API built using Node.js, Express, MongoDB and Mongoose.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- bcrypt
- JSON Web Token
- Postman
- Git/GitHub

## Project Structure


store-backend/
│
├── src/
│   ├── server.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── authRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── productController.js
│   │   ├── authController.js
│   │   └── orderController.js
│   │
│   └── middleware/
│       ├── authMiddleware.js
│       └── roleMiddleware.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md


## Architecture


Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Model
   ↓
MongoDB


### Routes

Routes define the API endpoints and connect requests to controllers.

### Controllers

Controllers handle request and response logic.

### Models

Models define the database structure and provide the interface for MongoDB operations.

### Middleware

Middleware handles operations that should happen before the controller, such as authentication and role checks.

## MongoDB

The application connects to MongoDB using Mongoose.

The connection string is stored in `.env`:


PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret


The `.env` file should not be committed to GitHub.

## Authentication

The authentication flow is:


Register
   ↓
bcrypt
   ↓
Password Hash Stored
   ↓
Login
   ↓
bcrypt.compare()
   ↓
JWT
   ↓
Auth Middleware


Registration creates a user with the default role:

user


The login API verifies the email and password and then creates a JWT containing basic information such as:


userId
role


Sensitive information should not be placed inside the JWT.

## RBAC

The application uses simple role-based access control.

### User

View products
Create orders
View own orders


### Manager

View products
Create products
Update products
View orders


### Admin


Manage users
Manage products
Manage orders


The project intentionally keeps RBAC simple and does not use a complex permissions database.

## API Endpoints

### Authentication


POST /api/auth/register
POST /api/auth/login


### Users

POST   /api/users
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id

### Products


POST   /api/products
GET    /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id


### Orders


POST /api/orders
GET  /api/orders
GET  /api/orders/:id


## Running the Project

Install dependencies:

npm install


Start normally:


npm start


Start in development mode:

npm run dev


The server runs on:


http://localhost:3000


## Testing

Postman can be used to test successful and failure cases for:

- Users
- Products
- Authentication
- RBAC
- Orders

Authentication failures return:

401 Unauthorized

Authorization/RBAC failures return:

403 Forbidden

