# 🎶 **MERN Music Player Application** 🎶

This repository contains a music player web application built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). Users can register, log in, upload their music, stream songs, and manage playlists in a secure and scalable environment.

---

## 🚀 **Features**
- 🔒 **Secure Authentication** - User authentication using JWT.
- 📧 **OTP Authentication** - Secure email verification for registration and password reset.
- 🎵 **Music Upload** - Upload up to 10 music tracks at a time with Cloudinary.
- 🖥️ **Responsive Design** - Smooth and modern UI built with React.js.
- 📁 **Manage Songs** - Add, view, and delete songs.
- ⏳ **Recently Played** - Tracks the user's recently played songs.
- 👩‍💼 **Admin Dashboard** - Manage users and view analytics.

---

## 📦 **Tech Stack**
| **Technology**  | **Description**  |
|-----------------|------------------|
| **Frontend**    | React.js         |
| **Backend**     | Express.js, Node.js  |
| **Database**    | MongoDB with Mongoose |
| **Authentication** | JSON Web Token (JWT) |
| **File Storage**| Cloudinary        |
| **Email Service**| Nodemailer        |
| **OTP Generation** | OTP Generator   |
| **Styling**     | CSS & React Components |

---

## 🔑 **Security & Authentication**

### 🔐 **JWT (JSON Web Token) Authentication**
JWT is used to securely authenticate users in this application. Here's how the security is implemented:
1. **User Authentication**: When a user logs in, a signed JWT token is created using a secret key and sent as a secure cookie. The token contains the user ID and email.
2. **Route Protection**: Protected routes (e.g., upload, delete songs) are secured using Passport.js with JWT strategy. Only authenticated users can access these routes.
3. **Token Verification**: On each request to a protected route, the JWT token is verified to confirm the user's identity.
4. **Secure Cookie Options**: 
    - Cookies are set to `HttpOnly` and `Secure`, ensuring they can't be accessed via JavaScript and are only sent over HTTPS.
    - `SameSite='None'` ensures cookies are properly shared across different domains.

### 📧 **OTP Authentication**
To enhance security, this application implements OTP authentication for user registration and password recovery:
1. **OTP Generation**: An OTP is generated using the **OTP Generator** package and sent to the user's registered email via **Nodemailer**.
2. **Email Delivery**: The OTP is sent as part of the verification process, ensuring that only users with access to the provided email can complete their registration or password reset.
3. **OTP Verification**: The application verifies the OTP entered by the user against the generated OTP stored temporarily in the database.

### 🖼️ **Cloudinary for Secure Media Storage**
We use **Cloudinary** to handle secure file uploads, particularly music files and images. Here's how the process works:
1. **File Upload**: Multer is configured with `CloudinaryStorage`, allowing files to be uploaded directly to Cloudinary. 
2. **Allowed Formats**: Only specific formats like `jpeg`, `png`, `mp3`, and `wav` are permitted.
3. **Transformations**: Uploaded files can be resized and transformed on the fly using Cloudinary’s built-in tools, ensuring optimized storage and display.

---

## 📦 **How to Install and Run**

### **Prerequisites**
Ensure you have the following installed:
- Node.js
- MongoDB (local or Atlas)
- Cloudinary account for media storage
- Nodemailer for email services

### **Backend Setup**
1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/music-player-mern.git
    cd music-player-mern
    ```

2. **Install dependencies**:
    ```bash
    cd backend
    npm install
    ```

3. **Configure environment variables**:  
Create a `.env` file in the `backend` directory and add:
    ```bash
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    MONGO_URI=your_mongo_database_url
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password
    ```

4. **Start the backend server**:
    ```bash
    npm start
    ```

### **Frontend Setup**
1. Navigate to the frontend directory and install dependencies:
    ```bash
    cd frontend
    npm install
    ```

2. Start the React frontend:
    ```bash
    npm start
    ```

The app will be running at:  
**`http://localhost:3000`**

---

## 🌐 **API Endpoints**

### **User Authentication**
| **Route**              | **Method** | **Description**            |
|------------------------|------------|----------------------------|
| `/register`            | `POST`     | Registers a new user.       |
| `/login`               | `POST`     | Logs in a user and returns JWT token. |
| `/current_user`        | `GET`      | Returns the currently logged-in user (JWT required). |
| `/logout`              | `GET`      | Logs out the user by clearing the JWT token. |

### **Music Management**
| **Route**              | **Method** | **Description**            |
|------------------------|------------|----------------------------|
| `/user-songs`          | `POST`     | Get the user's song list (JWT required). |
| `/add-songs`           | `POST`     | Upload songs (JWT required, up to 10 files at once). |
| `/delete-songs`        | `DELETE`   | Delete a song from the user's list (JWT required). |
| `/recent`              | `POST`     | Update the user's recently played songs (JWT required). |
| `/grecent`             | `POST`     | Get the user's recently played songs (JWT required). |

### **Admin Management**
| **Route**                       | **Method** | **Description**                               |
|---------------------------------|------------|-----------------------------------------------|
| `/admin/login`                  | `POST`     | Authenticates an admin user.                  |
| `/admin/logout`                 | `POST`     | Logs out the admin user.                      |
| `/admin/verify`                 | `GET`      | Verifies the authenticity of the admin token. |
| `/admin/create-user`            | `POST`     | Registers a new user (admin required).        |
| `/admin/delete-user`            | `DELETE`   | Deletes a user (admin required).              |
| `/admin/get-admin`              | `GET`      | Retrieves details of the currently logged-in admin. |
| `/admin/get-music-users`        | `GET`      | Fetches a list of all music users.            |
| `/admin/put-music-users`        | `PUT`      | Updates details of music users (admin required). |
| `/admin/delete-music-users/:id` | `DELETE`   | Deletes a specific music user by their ID (admin required). |
| `/admin/get-analytics`          | `GET`      | Provides analytics data related to the application. |

---

## 📁 **Project Structure**

```bash
/backend
    /config       # Configuration for Cloudinary, Passport (JWT), and Nodemailer
    /controllers  # Backend logic for user authentication, OTP handling, and song management
    /models       # Mongoose schemas for users and songs
    /routes       # API routes for authentication and home controllers
    app.js        # Main server file
    .env          # Environment variables
/frontend
    /src          # React components and assets
README.md         # You're here!
