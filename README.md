# Typing Test

### Table of Contents 
- [Features](#features)
- [Technical Stack](#technical-stack)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
  - [Deployment](#deployment)
- [Demo](#demo)

## Features
![image](https://user-images.githubusercontent.com/87303121/201081692-7c6622a9-7ad2-471d-80d3-4e2a1f590a7b.png)
Typing Test is a simple typing test app where you can measure your typing speed.

Features are:
- User Profile
  - Register, Login, Edit Display Name, Persistent User using `localStorage`.
- Typing Test
  - Generate Random words, Custom user defined words, (scuffed) WPM calculation, saving of high score to logged in user.
  
Words per minute is calculated with the following formula:

![image](https://user-images.githubusercontent.com/87303121/201144212-f3df9184-df5d-4336-bf05-1ab7f408a653.png)

Taken from: https://www.typingtyping.com/wpm-calculator/

_Note_: The formula is loosely followed because shortcuts are done due to technical limitations. Therefore, the WPM calculation is not very accurate.

## Technical Stack
### Front-end
Using:
- Vue.js (MVVM framework)
- Element+ (UI framework)
- random-words (NPM library)
- Google Fonts (Roboto Mono and Inconsolata)

### Back-end

Using:
- Node.js (runtime environment)
- Express (web application framework)
- Sqlite (database)

### Deployment
Using:
- Docker (Container)
- NGINX (Reverse proxy)
- Amazon EC2 (Cloud)

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
