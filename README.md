# Education Management System
---
### env guide

PORT = 8888

DATABASE = "mysql://u:pw@localhost:3306/b"

JWT_SECRET

EMAIL_USER

EMAIL_PASS

GOOGLE_CLIENT_ID

STRPIE_PUBLISHABLE_KEY

STRPIE_SECRET_KEY

---
# ER DIAGRAM
![alt text](https://i.imgur.com/jc1jFHZ.png) 

---

## Project Description

The university registration system is designed to facilitate student, instructor, and administrator interactions. It enables students to register for courses, view schedules, check grades, and monitor payment status. Instructors can manage course content, grade students, and communicate important updates. Administrators handle student and faculty data, course offerings, schedules, and payment verification. The system ensures secure, reliable, and scalable operations, supporting the future growth of users while providing an intuitive interface for all stakeholders.

## Features

- **User Features:**
  - Register and log in securely using JWT-based authentication.
  - Manage accounts, view balances, and transaction history.
  - Perform transactions such as deposits, withdrawals, and transfers.
  - Secure password handling with **bcrypt** hashing.
  
- **Admin Features:**
  - Manage user accounts and verify transactions.
  - Generate transaction reports for analysis.
  - Monitor system activity and user behaviors.

## Technologies Used

- **JWT (JSON Web Token)**: Provides secure user authentication and authorization, ensuring only authorized users can access specific features.
- **NodeMailer**: Used to send email notifications, such as account verification, transaction receipts, and alerts for suspicious activity.
- **Swagger**: For auto-generating API documentation, making it easy for developers to understand and interact with the system's APIs.
- **Jest**: JavaScript testing framework used to ensure the system operates correctly by performing unit and integration tests.
- **Joi**: A data validation library used to validate user input and ensure the integrity and correctness of the data being submitted (e.g., transaction amounts, email addresses).
- **Prisma**: ORM tool for managing database operations, connecting the Node.js application to the database seamlessly.
- **Bcrypt**: A password hashing library that securely hashes user passwords before storing them in the database, ensuring secure password management.
