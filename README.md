# Protected Jsonplaceholder Backend

**Protected Jsonplaceholder Backend** is a demo project showcasing how to use the [`@luikingkit/auth-simplified`](https://github.com/luikingkit/auth-simplified) authentication library in a Node.js environment. This backend applies robust authentication and proxies resource requests to [JSONPlaceholder](https://jsonplaceholder.typicode.com), a popular free fake REST API platform. This demo allows you to experience protected API endpoints over JSONPlaceholder.

<br />

## Prerequisites

- **MongoDB**  
   This demo requires a running MongoDB service.  
   You can use a remote MongoDB instance (e.g., [MongoDB Atlas](https://www.mongodb.com/atlas)) or run it locally.  
   For installation guides, visit the [MongoDB website](https://www.mongodb.com).

  **To start MongoDB locally (Ubuntu example):**

  ```sh
  sudo systemctl start mongod
  ```

<br />

## Environment Setup

Create a .env file in your project root directory with the following content.
You may adjust the values as needed:

```
JWT_ACCESS_SECRET_ADMIN=adminaccesssecret
JWT_REFRESH_SECRET_ADMIN=adminrefreshsecret
JWT_ACCESS_SECRET_COMMON=commonaccesssecret
JWT_REFRESH_SECRET_COMMON=commonrefreshsecret
JWT_ACCESS_EXPIRES_IN_MINUTES=5
JWT_REFRESH_EXPIRES_IN_MINUTES=30
DB_URI=mongodb://127.0.0.1:27017/jsonplaceholder
USER_NAME=admin
TEMPORARY_PASSWORD=Ab1234567890123!
```

**Notes:**

- `JWT_REFRESH_EXPIRES_IN_MINUTES` must be greater than `JWT_ACCESS_EXPIRES_IN_MINUTES`.
- check out the [Password Rules](https://github.com/luikingkit/auth-simplified?tab=readme-ov-file#password-rules)

<br />

## Running the Backend Server

Install dependencies and start the server in development mode:

```sh
npm install
npm run dev
```

The server will launch and connect to MongoDB.
Default endpoints are available at http://localhost:3000.

<br />

## API Overview

### Authentication

See the [API Overview in the auth-simplified documentation](https://github.com/luikingkit/auth-simplified?tab=readme-ov-file#api-overview) for details on standard authentication endpoints, including login, logout, token refresh, and password change.

Login using (the value you set in .env file)

- username: admin
- password: Ab1234567890123!

<br />

### Extended API Endpoints

#### Member Login

Authenticate a demo member and obtain access and refresh tokens.

`POST /api/auth/members/login`

Demo Credentials:

- username: john
- password: 123456

**Request**:

```json
{
  "username": "john",
  "password": "123456"
}
```

**Response**:

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

<br />

#### Authorize Guest

Obtain an access token for a guest via API key.

`POST /api/auth/guest`

Demo API Key:

- apiKey: app-api-key-123

**Request**:

```json
{
  "apiKey": "app-api-key-123"
}
```

**Response**:

```json
{
  "accessToken": "..."
}
```

<br />

### JSONPlaceholder Resource APIs

#### Common Headers

All API requests require the following headers:

```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer <access_token>
```

admin, member, guest allowed

```
GET /api/posts
GET /api/posts/:postId
```

admin, member allowed

```
POST/DELETE/PUT /api/posts
POST/DELETE/PUT /api/posts/:postId
```

**Note:**  
These endpoints proxy requests and responses to/from [JSONPlaceholder](https://jsonplaceholder.typicode.com).  
For exact response formats, see the [JSONPlaceholder documentation](https://jsonplaceholder.typicode.com/guide).

<br />

## References

- Auth Library Docs: [@luikingkit/auth-simplified](https://github.com/luikingkit/auth-simplified)
- MongoDB Docs: [mongodb.com/docs](https://www.mongodb.com/docs/)
- Fake API Reference: [JSONPlaceholder](https://jsonplaceholder.typicode.com/guide/)

<br />

## License

MIT © [Lui King Kit](https://github.com/luikingkit)

<br />

## Support

- Issues & Bugs: [GitHub Issues](https://github.com/luikingkit/protected-jsonplaceholder-backend/issues)
