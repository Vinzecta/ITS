# Backend Setup Guide

Follow these steps to set up and run the backend of this project.

---

## 1. Install and Configure XAMPP
- Download and install **XAMPP**.
- Start **Apache** and **MySQL** from the XAMPP Control Panel.
- Refer to `./Lab 1.1 Install XAMPP.pdf` for detailed installation instructions.
- If MySQL does not start after step 4:
  - Open **Task Manager**.
  - End any running **MySQL** processes.
  - Try starting MySQL again from XAMPP.

---

## 2. Install Composer
- Download Composer from [getcomposer.org/download](https://getcomposer.org/download).
- Follow the installation instructions for your operating system.

---

## 3. Install Project Dependencies
- In the project root directory, run:
  ```bash
  composer install

---

## 4. Set Up the Database
- Open [phpMyAdmin](http://localhost/phpmyadmin/index.php?route=/server/sql).
- Run the SQL script ITS_DataBase_1.sql from row 1 to row 380.
- Do not import any data at this stage.

---

## 5. (Optional) Install Postman
- Postman is recommended for easy API testing.
- Download Postman from https://www.postman.com/downloads/.
- Create an account and follow the setup instructions.

---

## 6. API Documentation
- Refer to ./API_DOC.md for details on all implemented API endpoints.
- Authentication Notes:
    - For all APIs (except register and login), you must include:
    - Key: Authorization
    - Value: JWT token returned from the login API
- Ensure the HTTP method matches the specification in API_DOC.md.