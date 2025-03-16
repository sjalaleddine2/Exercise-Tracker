# Exercise Tracker

## Overview

Exercise Tracker is a web application designed to help users monitor and manage their workout routines. Users can log exercises, track progress over time, and maintain a history of their physical activities.

## Features

- **Exercise Logging**: Add, edit, and delete exercises with details such as type, duration, and date.
- **Progress Tracking**: Visualize workout history and monitor improvements over time.
- **Responsive Design**: Accessible on various devices, including desktops, tablets, and smartphones.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Version Control:** Git & GitHub

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Ensure you have a running instance)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/sjalaleddine2/Exercise-Tracker.git
   cd Exercise-Tracker
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the project root and add the following:

   ```ini
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/exercise_tracker
   ```

4. **Start the Application**

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

## Usage

- **Add Exercise**: Log new exercises with details like type, duration, and date.
- **View History**: Access and manage your logged exercises.

