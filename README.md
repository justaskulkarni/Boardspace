<p align="center">
  <img src="./client/src/assets/dashboardlogo.png" />
</p>
<div align="center">
   <img src="./client/src/assets/navbarlogo.png" />
</div>
<hr>

<details>
<summary>Table of Contents</summary>

- [Description](#description)
- [Links](#links)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
- [Usage](#usage)
- [Team Members](#team-members)


</details>

## 📝Description

1. Implemented 3 level authentication using JWT for students, mentors and admins. 
2. OTP verification and document proof upload for mentors, enabling multistep cerdibility verification. 
3. Administrators have access to view uploaded mentor documents and can accept or reject mentor applications.
4. Students can upload images of their doubt with exam tags. Comment feature for students and mentors.
5. Created a robust chat platform using Socket.IO to facilitate discussions and doubt resolution
among students and mentors for various competitive examinations.
6. One-on-one chat with admin for feedback and descrepancy resolution.
## 🔗Links

- [GitHub Repository](https://github.com/justaskulkarni/Boardspace.git)
- [Screenshots](https://drive.google.com/drive/folders/1f8D1QUmvyqMFHa6nyiYLAscsNcdDY8PY?usp=sharing)

## 🤖Tech-Stack

- ReactJS
- NodeJS
- ExpressJS
- MongoDB
- Socket.IO
- Multer
- AWS S3

## 🛠Project Setup

>Firstly, you will need to clone the repository using the clone link above using the command in terminal in a dedicated folder:

    git clone https://github.com/justaskulkarni/Boardspace.git

>Then, you will need to install all the node modules which are required for running the client on your machine using the command in terminal for client folder:

    npm install

>Then, you will need to install all the node modules which are required for running the server on your machine using the command in terminal for server folder:

    npm install

>In the server folder create a .env file to add environment variables

    MONGO_URL = YOUR_MONGO_URL
    SECRET = YOUR_SECRET
    MJ_PUBLIC = YOUR_MJ_PUBLIC
    MJ_SECRET = YOUR_MJ_SECRET
    BUCKET_NAME = YOUR_BUCKET_NAME
    BUCKET_REGION = YOUR_BUCKET_REGION
    ACCESS_KEY = YOUR_ACCESS_KEY
    SECRET_KEY = YOUR_SECRET_KEY

## 💻Usage

>In terminal for client folder run
    
    npm start

>In terminal for server folder run

    npm start

## 👨‍💻Team Members


- [Siddhant Baheti](https://github.com/0610sid) 
- [Aditya Kulkarni](https://github.com/justaskulkarni)
- [Kedar Dhamankar](https://github.com/KedarDhamankar)
- [Rucha Patil](https://github.com/Ruchapatil03)
