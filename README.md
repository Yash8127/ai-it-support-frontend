<div align="center">

# 🤖 AI IT Support — Frontend

### Modern React Interface for an AI-Powered IT Service Management Application

<p>
A responsive React and Vite frontend for the AI IT Support platform, providing secure authentication, ticket management, dashboard analytics, notifications, password recovery, ticket history, and AI-assisted IT support through REST APIs.
</p>

<p>
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/CSS3-Styling-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/REST_API-Integration-009688?style=for-the-badge" alt="REST API">
  <img src="https://img.shields.io/badge/Git-Version_Control-F05032?style=for-the-badge&logo=git" alt="Git">
  <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub">
</p>

---

### 👨‍💻 Developed By

## **Gurindapalli Yaswanth Varma**

### Java Full Stack Developer

📧 **Email:** <a href="mailto:yashvarmagurindapalli@gmail.com">yashvarmagurindapalli@gmail.com</a>

🔗 **GitHub:** <a href="https://github.com/Yash8127">https://github.com/Yash8127</a>

💼 **LinkedIn:** <a href="https://www.linkedin.com/in/yaswanth-gurindapalli/">https://www.linkedin.com/in/yaswanth-gurindapalli/</a>

</div>

---

# 📖 Project Overview

The AI IT Support frontend is a React-based user interface for the AI IT Support Service Management platform.

It communicates with the Spring Boot backend through REST APIs and provides a complete interface for users and administrators to interact with the IT support system.

The frontend focuses on:

- Clean and responsive user experience
- Secure authentication flow
- Ticket management
- Dashboard analytics
- Notifications
- Ticket history
- AI assistant interaction
- Password recovery
- Role-based user interface
- Centralized backend API configuration

---

# ✨ Key Features

## 🔐 Authentication

The application provides a complete authentication interface including:

- User login
- User registration
- Forgot password
- Reset password
- JWT-based authenticated sessions
- Authentication error handling
- Loading states
- Form validation
- Protected application access

---

## 🎫 Ticket Management

The ticket interface supports:

- Viewing tickets
- Creating tickets
- Editing tickets
- Ticket details
- Ticket history
- Ticket status management
- Ticket priority
- Ticket search and filtering
- Delete operations according to backend authorization rules

---

## 🤖 AI Assistant

The frontend includes a dedicated AI Assistant page for interacting with the backend AI functionality.

The AI assistant is designed to support IT ticket-related operations such as:

- Searching tickets
- Finding tickets by status
- Finding tickets by priority
- Finding critical or urgent tickets
- Searching laptop-related tickets
- Performing supported ticket operations

The frontend sends AI requests to the Spring Boot backend, which handles the AI integration and business rules.

---

## 📊 Dashboard

The dashboard provides an overview of IT support activity.

It displays ticket-related information such as:

- Total tickets
- Open tickets
- Closed tickets
- Ticket status statistics
- Ticket priority statistics

---

## 🔔 Notifications

The notification interface supports:

- Viewing notifications
- Unread notification count
- Marking notifications as read
- User-specific notification handling

---

## 🔑 Forgot & Reset Password

The frontend provides a complete password recovery experience.

```text
Login
  │
  ▼
Forgot Password
  │
  ▼
Enter Email
  │
  ▼
Receive Reset Email
  │
  ▼
Open Reset Link
  │
  ▼
Reset Password
  │
  ▼
Return to Login
```

The backend is responsible for secure token generation, token expiration, validation, and password update.

---

# 🛠️ Technology Stack

<table>
<thead>
<tr>
<th>Category</th>
<th>Technology</th>
</tr>
</thead>
<tbody>
<tr><td>UI Library</td><td>React</td></tr>
<tr><td>Build Tool</td><td>Vite</td></tr>
<tr><td>Language</td><td>JavaScript</td></tr>
<tr><td>Styling</td><td>CSS3</td></tr>
<tr><td>API Communication</td><td>REST APIs</td></tr>
<tr><td>Backend</td><td>Spring Boot</td></tr>
<tr><td>Authentication</td><td>JWT</td></tr>
<tr><td>AI Backend</td><td>Spring AI + Ollama</td></tr>
<tr><td>Package Manager</td><td>npm</td></tr>
<tr><td>Development Tool</td><td>VS Code</td></tr>
<tr><td>Version Control</td><td>Git</td></tr>
<tr><td>Repository</td><td>GitHub</td></tr>
</tbody>
</table>

---

# 🏗️ Frontend Architecture

The frontend is organized into reusable components and page-level views.

```text
                         React Application
                                │
                    ┌───────────┴───────────┐
                    │                       │
                  Pages                Components
                    │                       │
                    └───────────┬───────────┘
                                │
                                ▼
                         API Configuration
                                │
                                ▼
                           REST API
                                │
                                ▼
                       Spring Boot Backend
```

The application separates:

- Page-level functionality
- Reusable UI components
- API configuration
- Styling
- Authentication screens

---

# 📂 Project Structure

```text
ai-it-support-frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── EditTicketModal.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TicketHistory.jsx
│   │   ├── TicketModal.jsx
│   │   ├── TicketTable.jsx
│   │   └── Toast.jsx
│   │
│   ├── config/
│   │   └── api.js
│   │
│   ├── pages/
│   │   ├── AIAssistant.jsx
│   │   ├── CreateTicket.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DeletedTickets.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Login.jsx
│   │   ├── Notifications.jsx
│   │   ├── Register.jsx
│   │   ├── ResetPassword.jsx
│   │   └── Tickets.jsx
│   │
│   ├── App.css
│   └── App.jsx
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# 📁 Components

## Sidebar

Provides the main application navigation.

Typical navigation areas include:

- Dashboard
- Tickets
- Create Ticket
- AI Assistant
- Notifications
- Other authorized sections

---

## Header

Provides the top-level application header and user-related interface elements.

---

## TicketTable

Displays ticket information in a structured table/list interface.

It is used for:

- Viewing tickets
- Accessing ticket details
- Editing tickets
- Performing supported ticket actions

---

## TicketModal

Displays ticket details in a modal interface.

---

## EditTicketModal

Provides the user interface for editing ticket information.

---

## TicketHistory

Displays ticket activity and historical changes associated with tickets.

---

## Toast

Provides reusable user feedback messages such as:

- Success messages
- Error messages
- Operation feedback

---

# 📄 Pages

## Login

Provides the user login interface.

Features include:

- Username input
- Password input
- Login validation
- Error handling
- Forgot password navigation
- Registration navigation

---

## Register

Provides the new-user registration interface.

---

## ForgotPassword

Allows users to request a password reset using their registered email address.

---

## ResetPassword

Handles the password reset page accessed through the reset link.

---

## Dashboard

Displays ticket-related analytics and application information.

---

## Tickets

Provides the primary ticket management interface.

---

## CreateTicket

Provides a dedicated interface for creating support tickets.

---

## AIAssistant

Provides the frontend interface for AI-assisted IT support operations.

---

## Notifications

Displays application notifications and unread notification information.

---

## DeletedTickets

Provides the interface for authorized administrative access to deleted ticket information.

---

# 🔗 API Configuration

The frontend uses a centralized API configuration.

File:

```text
src/config/api.js
```

Current configuration:

```javascript
export const API_BASE =
    import.meta.env.VITE_API_BASE || "http://localhost:8080";
```

This avoids hardcoding the backend URL throughout the application.

---

# ⚙️ Environment Configuration

The frontend uses Vite environment variables.

### `.env`

For local development:

```env
VITE_API_BASE=http://localhost:8080
```

### `.env.example`

The repository contains an example environment configuration:

```env
VITE_API_BASE=
```

The actual `.env` file is excluded from Git using `.gitignore`.

> Do not commit private environment files or sensitive credentials to GitHub.

---

# 🔐 Authentication Flow

The frontend communicates with the backend authentication APIs.

```text
User
 │
 ▼
Login Page
 │
 ▼
Spring Boot Login API
 │
 ▼
JWT Token
 │
 ▼
Frontend Authentication State
 │
 ▼
Protected Application
 │
 ▼
REST API Requests
```

Authenticated requests include the JWT token when accessing protected backend endpoints.

---

# 🔄 Backend Integration

The frontend communicates with the Spring Boot backend through REST APIs.

```text
React Frontend
      │
      │ HTTP Requests
      ▼
Spring Boot REST API
      │
      ▼
Spring Services
      │
      ▼
MySQL / Ollama
```

The frontend is responsible for presentation and user interaction, while authentication, authorization, business logic, database operations, and AI processing are handled by the backend.

---

# 🧪 Development & Testing

The frontend can be tested locally using the Vite development server.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

The backend should be running separately on:

```text
http://localhost:8080
```

---

# 🚀 Installation & Setup

## Prerequisites

Install:

- Node.js
- npm
- Git
- VS Code
- Running AI IT Support Spring Boot backend

---

## 1. Clone the Repository

```bash
git clone <FRONTEND_REPOSITORY_URL>
cd ai-it-support-frontend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment

Create a `.env` file in the project root:

```env
VITE_API_BASE=http://localhost:8080
```

---

## 4. Start the Application

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 🧪 Application Workflow

A typical user workflow is:

```text
Open Application
       │
       ▼
      Login
       │
       ▼
    Dashboard
       │
       ├───────────────┐
       ▼               ▼
    Tickets       AI Assistant
       │
       ▼
 Create / View / Edit
       │
       ▼
   Ticket History
       │
       ▼
 Notifications
```

---

# 📱 Responsive Design

The frontend is designed to provide a responsive user interface across different screen sizes.

Responsive considerations include:

- Sidebar navigation
- Header layout
- Ticket tables
- Forms
- Modals
- Authentication pages
- Dashboard content

---

# 📊 Current Project Capabilities

The frontend currently provides:

- Login
- Registration
- Forgot password
- Reset password
- Dashboard
- Ticket management
- Ticket creation
- Ticket editing
- Ticket history
- Notifications
- AI Assistant
- Deleted ticket administration
- Toast notifications
- Centralized API configuration
- Environment-based backend URL
- Responsive UI

---

# 🧠 Skills Demonstrated

## Frontend Development

- React
- Component-based architecture
- React state management
- Reusable components
- Page-based application structure
- Form handling
- Conditional rendering
- Modal interfaces
- Responsive UI development

## API Integration

- REST API integration
- HTTP requests
- JWT authentication
- Centralized API configuration
- Environment variables
- Frontend/backend integration

## Project Management

- Git
- GitHub
- VS Code
- npm
- Vite

---

# 🎯 Project Highlights

✅ Built a complete React frontend for an IT Service Management application

✅ Integrated React with a Spring Boot REST backend

✅ Implemented authentication and password recovery interfaces

✅ Built reusable ticket management components

✅ Added dashboard analytics and notifications

✅ Integrated an AI Assistant interface

✅ Implemented centralized API configuration using Vite environment variables

✅ Separated reusable components from page-level functionality

✅ Prepared the frontend for independent deployment

---

# 🔗 Related Backend Repository

The frontend is designed to work with the Spring Boot backend:

```text
<BACKEND_REPOSITORY_URL>
```

Backend technology stack includes:

- Java
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- MySQL
- Spring AI
- Ollama

---

# 🚀 Future Enhancements

Possible future improvements include:

- Production deployment
- Improved UI animations
- Advanced ticket filtering
- Enhanced AI conversation experience
- Unit and component testing
- Automated frontend CI/CD
- Improved accessibility
- Progressive Web App support

---

# 📌 Learning Outcomes

This project provided practical experience in:

- Building React applications
- Creating reusable components
- Integrating REST APIs
- Managing authentication state
- Working with JWT-based authentication
- Using Vite environment variables
- Designing responsive interfaces
- Connecting React with Spring Boot
- Debugging frontend/backend integration
- Managing frontend source code with Git and GitHub

---

# 🤝 Contribution

This project is primarily developed as a personal portfolio and learning project.

Suggestions and improvements are welcome.

If you would like to explore the project:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Commit your changes.
5. Push the branch.
6. Open a Pull Request.

---

# 👨‍💻 About the Developer

## Gurindapalli Yaswanth Varma

**Java Full Stack Developer**

Interested in building secure, scalable, and user-friendly applications using Java, Spring Boot, React, MySQL, and modern AI technologies.

### Technical Interests

- Java
- Spring Boot
- React
- Full Stack Development
- REST APIs
- Database Design
- Spring Security
- AI Integration

---

# 📬 Contact

### 📧 Email

<a href="mailto:yashvarmagurindapalli@gmail.com">yashvarmagurindapalli@gmail.com</a>

### 💻 GitHub

<a href="https://github.com/Yash8127">https://github.com/Yash8127</a>

### 💼 LinkedIn

<a href="https://www.linkedin.com/in/yaswanth-gurindapalli/">https://www.linkedin.com/in/yaswanth-gurindapalli/</a>

---

# 📄 License

This project is created for **learning, educational, and portfolio purposes**.

---

<div align="center">

## ⭐ Thank You for Visiting ⭐

### If you like this project, consider giving the repository a ⭐ Star.

**Happy Coding! 🚀**

Developed with ❤️ by **Gurindapalli Yaswanth Varma**

</div>
