<!-- # Task Manager

## Overview

### Description

This project is a mobile app (compatible with iOS and Android) to manage tasks. It aims to help users manage their daily tasks and allow for a leaderboard feature that ranks the highest number of completed tasks of any users filtered by daily, weekly, and monthly. The application is built using React Native and npm for the frontend, node.js for the backend, with a Firebase Firestore for data storage and FIrebase Authentication for user authentications.

### Technologies

- Frontend: [React Native, npm]
- Backend: [Node.js]
- Database: [Firebase Firestore]

## Architecture

### System Architecture

### Components

1. **Frontend**
    - **Login**: Log in page. 
    - **Signup**: Sign up page if a user is never registered. 
    - **TaskPage**: Shows a user's completed and in progress tasks and monitors the number of completed tasks overall
    - **Leaderboard**: Ranks all users completed tasks count filtered by daily, monthly, and weekly.  -->

# Task Manager

Welcome to the **Task Manager** repository. This project is a mobile app (compatible with iOS and Android) to manage tasks with a built in leaderboard for users' completed task count. Below you will find information on how to get started, contribute, and more.

## Table of Contents

1. [Overview](#Overview)
2. [Tech Stack](#TechStack)
3. [Features](#Features)
4. [Quick Start](#QuickStart)
5. [Usage](#Usage)

## Overview

**Task Manager** is a mobile application developed using React Native. The application aims to help users manage their daily tasks and allow for a leaderboard feature that ranks the highest number of completed tasks of any users filtered by daily, weekly, and monthly. It is designed to be user-friendly, easy-to-use, and compatible across iOS and Android. 

## Tech Stack
- Node.js
- React Native
- Expo
- Stylesheet


## Features

- **Straightforward UI/UX Design**: Design a clean and straightforward UI
- **User Authentication**: Provides user authentication through Firebase Authentication using email + password
- **Dynamic Task page**: Shows a user's completed and in progress tasks and monitors the number of completed tasks overall.
- **Task updates**: Able to add and update tasks with a title and a description.
- **Leaderboard**: Ranks all users completed tasks count filtered by daily, monthly, and weekly. 

## Quick Start

To set up this project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- (Optional)[Expo Go app](https://expo.dev/go)
- (Optional) Android Studio or Xcode if running on your laptop

### Clone the Repository

```
git clone https://github.com/LJ-Song/task-manager-react-native.git
cd task-manager-react-native
```

### Install Dependencies

```
npm install

```

### Running the Application

```
npm start

```


## Usage

Once the application is installed and running, you can scan the QR code if you are using Expo Go app, or follow the steps on terminal for your respective choice of device. 

You can also open http://localhost:8081 in your browser to view the project. UI elements can appear differently than on your phone. 

For detailed usage on expo go, refer to the [Expo Go app](https://expo.dev/go).

<!-- ## Contact

If you have any questions or suggestions, feel free to reach out:

- **Project Maintainer**: [Your Name] - [your.email@example.com]
- **Contributors**: [List of contributors] -->