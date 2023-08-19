# LeadAdmin Application

Welcome to the LeadAdmin Application repository, built by Team-1. This document provides an overview of the proposed solution for the Lead Agent project. It covers the technology stack, including the Java API schema, React frontend, and database collections and schema required for the application. The report also includes preliminary data to kickstart the application development.

## Table of Contents:

1. [Introduction](#introduction)
2. [Technologies Required](#technologies-required)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)

## Introduction

The LeadAdmin Application is designed to manage leads from various sources and store them in a database, with associated attributes. It also includes an admin portal that facilitates lead visualization and allows operations such as lead deletion and assignment to agents.

## Technologies Used

The LeadAdmin Application is developed using the following technologies:

- Java for backend development
- Spring Boot for Java application framework
- MongoDB for database management
- React for frontend development
- (Add CSS styling details here)

## Installation

To set up the LeadAdmin application locally, follow these steps:

1. **Java Development Kit (JDK):**
   Install Java Development Kit (JDK) if not already installed.

2. **Spring Boot:**
   Install Spring Boot CLI or use a Spring Boot-compatible IDE.

3. **MongoDB:**
   - Install MongoDB and set up a database instance.
   - Create a database named "MassMutual" in MongoDB.

4. **Node.js:**
   Install Node.js if not already installed.

## Running the Application

### React Front-End

To run the React frontend, follow these steps:

1. In the project directory, open a terminal window.
2. Run the following command to install the required packages:

npm install

3. Run the following command to start the development server:

npm start


4. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.
5. The page will automatically reload when you make changes, and any lint errors will be shown in the console.

### Spring Boot Back-End

To run the Spring Boot backend, follow these steps:

1. Open the `lead-admin-back` folder using IntelliJ IDEA.
2. Navigate to `lead-admin-back/lead-admin-back/src/main/java/com/example/leadadminback/` and locate the `LeadAdminBackApplication.java` file.
3. Run the application to establish the connection between the frontend and backend.
