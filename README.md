# Chatter Gram

A full-stack social media application built as my final project for [The Odin Project](https://www.theodinproject.com/).

Chatter Gram allows users to create accounts, share posts, interact with other users, follow people, like posts, comment, and manage their profiles.

The project was built to bring together the frontend and backend concepts I learned throughout The Odin Project's JavaScript and Node.js curriculum.

## Features

### Authentication

* User registration and login
* JWT-based authentication
* Protected routes
* Password hashing with bcrypt
* Persistent authentication using local storage

### Users & Profiles

* View all users
* View individual profiles
* Edit your own profile
* User bios and avatars
* View followers and following
* Follow and unfollow users
* Follow-back functionality

### Posts

* Create posts
* View posts in a global feed
* View individual post details
* Posts are sorted from newest to oldest
* View post authors
* View comments and likes on posts

### Comments

* Add comments to posts
* Delete your own comments
* View comments on posts

### Likes

* Like and unlike posts
* View the number of likes
* View users who liked a post
* Database constraint prevents duplicate likes from the same user

### Follow Requests

* See users who follow you
* Follow them back
* Follow-back removes them from the request list

## Tech Stack

### Frontend

* React
* React Router
* JavaScript
* CSS

### Backend

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* JWT
* bcryptjs

### Database

* PostgreSQL
* Prisma

### Other Tools

* Faker.js for development/test data
* Git & GitHub
* Vercel for frontend deployment
* Render for backend deployment

## Project Structure

The project is separated into a React frontend and an Express backend.

```text
chatter_gram/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── ...
│
└── backend/
    ├── controllers/
    ├── routes/
    ├── middleware/
    ├── prisma/
    ├── generated/
    ├── seed.js
    └── ...
```

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* PostgreSQL database

### Clone the repository

```bash
git clone <your-repository-url>
cd chatter_gram
```

## Backend Setup

Navigate into the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run your database migrations:

```bash
npx prisma migrate dev
```

### Seed the database

The project includes a seed script that generates fake users and posts using Faker.

```bash
node seed.js
```

The seed creates:

* 6 fake users
* 10 fake posts

The seeded users all use:

```text
password123
```

for their password.

## Start the Backend

```bash
npm run dev
```

The backend will run on your configured local port.

## Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Users

```text
GET    /api/users
GET    /api/users/me
GET    /api/users/:id
PATCH  /api/users/me
GET    /api/users/:id/followers
GET    /api/users/:id/following
```

### Following

```text
POST /api/users/:userId/follow
```

The follow endpoint handles both following and unfollowing.

### Posts

```text
GET  /api/posts/feed
GET  /api/posts/:id
POST /api/posts
```

The feed currently displays all posts, sorted from newest to oldest.

### Comments

```text
POST   /api/posts/:postId/comments
DELETE /api/comments/:commentId
```

### Likes

```text
POST /api/posts/:postId/like
```

The like endpoint handles both liking and unliking.

## Database Relationships

The main relationships in the application are:

```text
User
 ├── Posts
 ├── Comments
 ├── Likes
 ├── Followers
 └── Following

Post
 ├── Author
 ├── Comments
 └── Likes

Comment
 ├── Author
 └── Post

Like
 ├── User
 └── Post

Follow
 ├── Follower
 └── Following
```

A composite unique constraint is used for likes:

```prisma
@@unique([userId, postId])
```

This prevents a user from creating multiple likes for the same post.

A similar constraint is used for follows:

```prisma
@@unique([followerId, followingId])
```

This prevents duplicate follow relationships.

## Design

Chatter Gram uses a dark, minimal interface with a yellow accent color.

The interface was designed around:

* Clear content hierarchy
* Responsive layouts
* Subtle transitions
* Card-based posts
* Simple navigation
* Mobile-friendly styling

## What I Learned

This project brought together many of the concepts I learned throughout The Odin Project.

Some of the major areas I practiced include:

* Building REST APIs with Express
* Structuring controllers and routes
* Authentication with JWT
* Password hashing
* Authorization and protected resources
* Database modeling with Prisma
* PostgreSQL relationships
* One-to-many and many-to-many relationships
* React state management
* React Router
* Connecting a React frontend to an Express API
* Handling API errors
* Managing authenticated requests
* Deploying a full-stack application
* Working with environment variables
* Testing application behavior with realistic data

## Future Improvements

There are several features that could be added in the future:

* Real-time notifications
* Real-time messaging with Socket.IO
* Image uploads for posts
* Infinite scrolling or pagination
* More advanced feed personalization
* Search functionality
* Post editing
* Post deletion
* Notification system
* Better mobile navigation
* Automated tests

These features were intentionally left outside the current scope of the project.

## Credits

Built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

Fake development data is generated using [Faker.js](https://fakerjs.dev/).

## Author

**Ahmad Mahmud**

Computer Science student and aspiring full-stack developer.

---

⭐ If you found this project interesting, feel free to explore the code and follow the development journey.
