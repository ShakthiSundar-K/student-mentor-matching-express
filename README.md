
# Mentor and Student Assignment API

This project is a Node.js and MongoDB-based API that allows creating mentors and students, assigning students to mentors, and managing mentor-student relationships. It includes the following features:
- Create mentors and students
- Assign one or multiple students to a mentor
- Change or assign a new mentor to a student
- Display all students assigned to a particular mentor
- Track a student’s previously assigned mentors

## Table of Contents
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)
- [Postman Documentation](#postman-documentation)

## Technologies Used
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing mentor and student data
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js
- **dotenv**: Environment variable management

## Project Structure

```plaintext
/assign-mentor
├── index.js            # Entry point of the server
├── .env                # Environment variables for configuration
├── models/             # Contains Mongoose models
│   ├── Mentor.js       # Mentor model schema
│   └── Student.js      # Student model schema
├── routes/             # API routes for mentors and students
│   ├── mentor.js       # Routes for mentor-related operations
│   └── student.js      # Routes for student-related operations
└── package.json        # Project metadata and dependencies
```

### File Explanations

- **index.js**: Initializes the Express server, connects to MongoDB, and defines the main route handlers for mentor and student operations.
- **.env**: Stores environment variables, such as `MONGO_URI` (MongoDB connection string) and `PORT` (port for the server).
- **models/Mentor.js**: Defines the Mentor schema, which includes fields for the mentor's name and an array of assigned students.
- **models/Student.js**: Defines the Student schema, which includes fields for the student's name, assigned mentor, and a list of previous mentors.
- **routes/mentor.js**: Contains API endpoints to create mentors, assign students to mentors, and get students assigned to a mentor.
- **routes/student.js**: Contains API endpoints to create students, assign or change mentors for a student, and view a student’s previous mentors.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/assign-mentor.git
   cd assign-mentor
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```
   The server will run on the port specified in the `.env` file (default is 3000).

## API Endpoints

### Mentor API

- **Create Mentor**  
  **Endpoint**: `POST /api/mentors`  
  **Description**: Creates a new mentor with the provided details.  
  **Request Body**:
  ```json
  {
    "name": "Mentor Name"
  }
  ```

- **Get All Students for a Mentor**  
  **Endpoint**: `GET /api/mentors/:mentorId/students`  
  **Description**: Retrieves all students assigned to a specific mentor.  
  **Parameters**:
    - `mentorId` (in URL): ID of the mentor.

- **Assign Multiple Students to a Mentor**  
  **Endpoint**: `POST /api/mentors/:mentorId/assign-students`  
  **Description**: Assigns multiple students to a specific mentor. Only students without an assigned mentor can be added.  
  **Request Body**:
  ```json
  {
    "studentIds": ["studentId1", "studentId2"]
  }
  ```

### Student API

- **Create Student**  
  **Endpoint**: `POST /api/students`  
  **Description**: Creates a new student with the provided details.  
  **Request Body**:
  ```json
  {
    "name": "Student Name"
  }
  ```

- **Assign or Change Mentor for a Student**  
  **Endpoint**: `POST /api/students/:studentId/assign-mentor/:mentorId`  
  **Description**: Assigns or changes a mentor for a specific student. If the student already has a mentor, the previous mentor is stored in the student’s `previousMentors` list.  
  **Parameters**:
    - `studentId` (in URL): ID of the student.
    - `mentorId` (in URL): ID of the new mentor.

- **Get Previously Assigned Mentors for a Student**  
  **Endpoint**: `GET /api/students/:studentId/previous-mentors`  
  **Description**: Retrieves a list of previously assigned mentors for a specific student.  
  **Parameters**:
    - `studentId` (in URL): ID of the student.

## Deployment

1. Push the project to your GitHub repository:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Deploy on [Render](https://render.com/) for backend:
   - Link your GitHub repository.
   - Set up a new web service for the Node.js app.
   - Set environment variables (`MONGO_URI`, `PORT`) on Render.

## Postman Documentation

[https://web.postman.co/workspace/My-Workspace~e54c06e6-3bec-49fb-82b4-1ad99c50d424/documentation/37037972-7fb98249-40d2-46f3-bdb4-a35e85049bf6
](https://documenter.getpostman.com/view/37037972/2sAY52ceb4)
## Conclusion

This project provides APIs to manage mentor-student relationships, allowing for flexible assignment and reassignment of mentors. It uses Express and MongoDB for backend functionality and Mongoose as an ORM.

