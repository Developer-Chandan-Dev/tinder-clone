# MERN Tinder Clone

This is a Tinder clone built using the MERN stack. The application allows users to sign up, log in, update their profiles, like and dislike other users, and chat if there's a mutual like. Real-time messaging is implemented using socket.io.

## Features

- **User Authentication**: Sign up and log in to the application.
- **Profile Management**: Update profile details.
- **Like/Dislike Users**: Swipe-like functionality to like or dislike other users.
- **Mutual Matching**: Users can chat when both like each other.
- **Real-time Messaging**: Chat in real-time using socket.io.

## Tech Stack

- **MongoDB**: Database.
- **Express.js**: Web framework for Node.js.
- **React.js**: Frontend library.
- **Node.js**: Backend runtime.
- **Socket.io**: Real-time communication.
- **JWT**: Authentication.
- **bcrypt**: Password hashing.

## Setup

### Frontend

1. Clone the repository.
2. Navigate to the frontend directory.

   ```bash
   cd client
   ```

3. Install dependencies.

   ```bash
   npm install
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

### Backend

1. Install dependencies.

   ```bash
   npm install
   ```

2. Create a .env file in the backend directory and add the following environment variables:

   ```base
   PORT = 5000
   MONGODB_URI =<your_mongo_db_connection_string>
   JWT_SECRET =<your_jwt_secret>
   NODE_ENV =development

   CLOUDINARY_CLOUD_NAME =<your_cloud_name>
   CLOUDINARY_API_KEY =<your_cloud_api_key>
   CLOUDINARY_API_SECRET =<your_cloud_api_secret>
   CLIENT_URL=<your_client_url>
   ```

3. Start the development server.

   ```base
   npm run dev
   ```

Usage
Sign Up/Login: Create an account or log in to an existing one.

Update Profile: Fill in profile details to be visible to other users.

Swipe: Like or dislike other users.

Chat: Start a conversation if there's a mutual like.

Contributing
Feel free to fork this repository, create a new branch, and submit a pull request with your enhancements or bug fixes.

License
This project is open-source and available under the MIT License.
