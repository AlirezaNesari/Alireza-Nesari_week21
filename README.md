# Warehouse Product Management

A full-stack product management application built with React and a RESTful API.

This project is an admin panel for managing products in an online store. It provides authentication, product management, search, filtering, pagination, and CRUD operations through a protected API.

## Features

### Authentication

* User registration
* User login
* JWT-based authentication
* Protected admin routes
* Automatic authorization using Bearer Token
* Logout functionality
* Form validation with React Hook Form and Yup

### Product Management

* Display products in the admin panel
* Create new products
* Edit existing products
* Delete products
* Product name validation
* Product quantity validation
* Product price validation
* Refresh product list after CRUD operations

### Search & Filtering

* Search products by name
* Filter products by price
* Query parameters for search and filters
* Pagination for product lists

### Form Management

Forms are handled using:

* React Hook Form
* Yup
* @hookform/resolvers

This approach provides reusable form handling, validation, error management, and submission states.

## Technologies

### Frontend

* React
* Vite
* React Router DOM
* Axios
* React Hook Form
* Yup
* @hookform/resolvers
* CSS Modules

### Backend

* Node.js
* Express
* REST API
* JWT Authentication
* Swagger API Documentation

## Project Structure

```text
Alireza-Nesari_week19/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── DeleteModal/
│   │   │   ├── EditProductModal/
│   │   │   └── ProductModal/
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── layouts/
│   │   │   └── AdminLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   └── Products/
│   │   │
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── PublicRoute.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── productService.js
│   │   │
│   │   └── validations/
│   │       ├── authSchema.js
│   │       └── productSchema.js
│   │
│   └── package.json
│
├── data/
├── middleware/
├── routes/
├── swagger/
├── server.js
├── package.json
└── README.md
```

## API

The application uses a RESTful API for authentication and product management.

The API documentation is available through Swagger.

### Product Model

Products contain the following main fields:

```text
name
price
quantity
```

### Product Operations

The admin panel communicates with the API using the following operations:

```text
GET     /products
POST    /products
PUT     /products/:id
DELETE  /products/:id
```

Protected operations require a valid JWT access token.

## Authentication Flow

After a successful login:

1. The user submits the login form.
2. The credentials are validated using Yup.
3. The frontend sends the login request to the API.
4. The API returns a JWT token.
5. The token is stored on the client.
6. Authenticated requests include the token in the `Authorization` header.
7. Protected routes become accessible to the user.

Authorization header:

```text
Authorization: Bearer <token>
```

## Form Validation

Form validation is implemented using React Hook Form and Yup.

### Login

The login form validates:

* Username is required
* Password is required

### Register

The registration form validates:

* Username is required
* Password is required
* Password minimum length
* Password confirmation must match the password

### Product

Product forms validate:

* Product name is required
* Quantity must be a valid integer
* Quantity cannot be negative
* Price must be a valid number
* Price must be greater than zero

Example validation schema:

```js
const productSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Product name is required."),

  quantity: yup
    .number()
    .typeError("Quantity must be a number.")
    .integer("Quantity must be an integer.")
    .min(0, "Quantity cannot be negative.")
    .required("Quantity is required."),

  price: yup
    .number()
    .typeError("Price must be a number.")
    .positive("Price must be greater than zero.")
    .required("Price is required."),
});
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/AlirezaNesari/Alireza-Nesari_week19.git
```

### 2. Navigate to the project

```bash
cd Alireza-Nesari_week19
```

### 3. Install backend dependencies

```bash
npm install
```

### 4. Install frontend dependencies

```bash
cd client
npm install
```

## Running the Project

The backend API should be running before using the frontend.

### Start the backend

From the project root:

```bash
npm start
```

or, depending on the available scripts:

```bash
node server.js
```

### Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

Vite will provide the local development URL in the terminal.

## Environment Variables

If environment variables are required, create a `.env` file in the appropriate project directory.

Example:

```env
VITE_API_URL=http://localhost:3000
```

Do not commit sensitive information such as:

* JWT secrets
* API keys
* passwords
* private credentials

## API Documentation

The project includes Swagger documentation for the API.

The Swagger files are located in:

```text
swagger/
```

The API specification should be used as the source of truth when implementing frontend API requests.

## Error Handling

The application handles common API errors including:

* Validation errors
* Unauthorized requests
* Forbidden requests
* Failed CRUD operations
* Invalid login credentials

Axios interceptors are used to attach the authentication token to protected requests and handle authentication-related responses.

## Git Workflow

The project is developed incrementally.

Each feature or bug fix should be committed separately using meaningful commit messages.

Example:

```bash
git add .
git commit -m "feat: add product creation form"
git push origin main
```

For bug fixes:

```bash
git add .
git commit -m "fix: validate login form with yup"
git push origin main
```

## Development Principles

The project follows these principles:

* Component-based architecture
* Reusable components
* Separation of API logic from UI components
* Form validation
* Protected routes
* Meaningful Git commits
* Clean and readable code
* Avoiding unnecessary dependencies
* Following the API contract defined by Swagger

## Future Improvements

Possible future improvements include:

* Product sorting
* Advanced filtering
* Better loading states
* Better error messages
* Dashboard statistics
* Responsive improvements
* Product details page
* Image upload support
* Role-based authorization
* Automated tests

## Author

**Alireza Nesari**

GitHub:

https://github.com/AlirezaNesari

## License

This project is created for educational and portfolio purposes.
