# Typing Test

Link to site: http://student-4.sutdacademytools.net (Hopefully its up)

### Link to backend repository: https://github.com/austin-jrh/sutd-devtools2022-backend

---

### Table of Contents 
- [Features](#features)

## Features
![image](https://user-images.githubusercontent.com/87303121/201081692-7c6622a9-7ad2-471d-80d3-4e2a1f590a7b.png)
Typing Test is a simple typing test app where you can measure your typing speed.

Features are:
- User Profile
  - Register, Login, Edit Display Name, Persistent User using `localStorage`.
- Typing Test
  - Generate Random words, Custom user defined words, (scuffed) WPM calculation, saving of high score to logged in user.

## Technical Stack
### Front-end
Using:
- Vue.js (MVVM framework)
- Element+ (UI framework)
- random-words (NPM library)
- Google Fonts (Roboto Mono and Inconsolata)

### Back-end - [link to repository](https://github.com/austin-jrh/sutd-devtools2022-backend)
Using:
- Node.js (runtime environment)
- Express (web application framework)
- Sqlite (database)

## Demo
- Login to existing user

![](./devtools2022-frontend/readme_images/01_login.png)


- Edit display name of logged in user

![](./devtools2022-frontend/readme_images/02_displayName.png)


- Custom tests

![](./devtools2022-frontend/readme_images/03_customTest.png)


- Create Custom Test

![](./devtools2022-frontend/readme_images/04_createCustomTest.png)


- Edit existing Custom test

![](./devtools2022-frontend/readme_images/05_editCustomTest.png)


- Run Custom test

![](./devtools2022-frontend/readme_images/06_runCustomTest1.png)
![](./devtools2022-frontend/readme_images/07_runCustomTest2.png)


- Delete existing Custom test

![](./devtools2022-frontend/readme_images/08_deleteCustomTest1.png)
![](./devtools2022-frontend/readme_images/09_deleteCustomTest2.png)

## Setup
1. Clone the repository. 
```
git clone https://github.com/austin-jrh/sutd-devtools2022.git
```

2. Navigate to path where the `Dockerfile` exist.
```
cd devtools2022-frontend/
ls # you should be in the Dockerfile directory
```

3. Run `run.sh` to build and run Dockerfile.
```
./run.sh
```

4. Check if the Docker container is running.
```
docker ps
```

## Security Vulnerability
### SQL Injection attack with crafted form inputs (login)
### Modifying the database without authorization (change highscore)
### Access to profiles
