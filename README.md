# Balıklıova Fish Auction Project

## Summary about project
This project is created by *IZTECH Students* in the Collaborators part. The project aims to create an online fish auction platform for Balıklıova Cooperative Members. People can join auction for buying fish instead of being physically there. We have created an interface for Cooperative Head to present auction and sell fish as well. 

## General Information about techincal details of the project
<details>
<summary>Learn more!</summary>

### *The Architecture of the Implementation*
*MVC software architectural pattern* is used in the project. Controller classes act as an interface between database and view components to process all incoming requests, manipulate data using the model components. Service classes handle the necessary business logic and functions for the controller classes. Model classes correspond to all the necessary data that is stored and the needed data-related logic.

### *The Technologies*

---

### *Front-end Side*
We have used *Javascript programming language* and *React library* (they call themselves library not framework) to implement front-end. React is flexible due to component-based structure. Also it has a wide range of users (188k stars in Github Repo). Lastly, we have team members who have experience in ReactJS.
  
---
  
### *Server Side*
We have used *Java programming language* and *Spring Boot framework* to implement *back-end*. Spring is very flexible thanks to extensions and third party libraries. It simplifies and eases the process (Ex: Lombok getter-setter) greatly. Furthermore, Spring has *Inversion of Control* and *Dependency Injection* features so we focus on other stuff. Also, all team members have experience in Java.	

---

### *Storage Side*
We have used *MySql* on the *storage side*. MySql is a Relational Database Management System. We use it because it is free, has a high scalability option. Lastly, some of our team members have experience in MySql.

---

Table of Contents
1. Java Spring Boot
2. MYSQL SQL structure engine
3. HTML5 Markup Language
4. CSS Style Sheet Language
5. Javascript / frameworks -> React.js
6. SSH
7. Git VCS

---

### Why Java-Spring framework?
1. Java programming language is easy to implement.
2. Java spring framework is understandable. 
3. Object-oriented manners can be implemented.
4. Active communities and quick debugging.
5. How to implement Java Spring framework? - Go to spring initializer web page 
 
---

### Why javascript?
On many models with progress of technology, web applications required browser based dynamic models.
Using javascript will bring a new dynamic manner to application development.

---

### Why ssh?
SSH technology generally for remote controlling and testing the server. In this web application , tests and deployment  can be implemented in a remote server.
With ssh technology no one can access the remote machine who does not have the key.
Cyber resilience of the system is the most important thing for any kind of bad situation.
What is the Git Version Control System?
Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

---

### Why Git?
Working with a big devops team is exhaustive for collaboration and complicated when assignments are collected in the main project.
It is the best way to use the version control system for everyone in this project.
</details>

## Getting Started with Frontend

<details>
<summary>Available Scripts</summary>

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

---

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

---

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
</details>

## Getting Started with Backend
<details>
<summary>Application Properties and API Documentation</summary>

### Ignored prop. templates:

- Application.Properties
```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5InnoDBDialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl=false
spring.datasource.url=jdbc:mysql://localhost:3306/fish?useSSL=false&serverTimezone=UTC&useLegacyDatetimeCode=false
spring.datasource.username=root
spring.datasource.password=12345678
```

---

### <strong> API DOCUMENTATION </strong>

#### 1) URL => ```/api/customers``` *GET*:
```
- Shows all customers in db.
```

---

#### 2) URL => ```/api/fisherman``` *GET*:
```
- Shows all fishermans in db.
```

---

#### 3) URL => ```/api/admin``` *GET*:
```
- Shows all admins in db.
```

---

#### 4) URL => ```/api/members``` *GET*:
```
- Shows all members in db.
```

---

#### 5) URL => ```/api/login/get/{username}/{password}``` *GET*:
```
- Getting user login function.
- username and password must be changed! this is for demo.
```

---

#### 6) URL => ```/api/signup/customer``` *POST*:
```
- User signup function.
- This url requeires Customer object.
```
```
- customer Template:

{
    "username": "randomUser",
    "password": "random_psw_123",
    "surname": "iba"        
    "name": "cagatay",    
    "mail": "random@gmail.com",
    "address": "randomAddress"
}
```

---

#### 7) URL => ```/api/signup/member``` *POST*:
```
- Member signup function.
- This url requeires Member object.
```
```
- member Template:

{
    "username": "Member_123",
    "mail": "member234@email.com",
    "password": "random_psw_234"

}
```

---

#### 8) URL => ```/api/register-fisherman``` *POST*:
```
- Fisherman register function.
- This url requeires fisherman object.
```
```
- fisherman Template:

{
    "username": "Ali_Kaptan",
    "password": "random_psw_567",
    "mail": "randomFm@gmail.com",
    "iban": "11111111111111111111111111",
    "owner": "ali kuscu"                               
}
```

---

#### 9) URL => ```/api/cooperativeHead/getCode``` *GET*:
```
- Getting code for aucion function.
- Returns String code
```

---

#### 10) URL => ```/api/auction/fetchAuctions``` *GET*:
```
- Getting all auctions.
- Returns list of auction objects.
```

---

#### 11) URL => ```/api/auction/add``` *POST*:
```
- Adding auctions to systems.
- This url requires auction object.
```
```
- auction Template:

{
    "name": "MEZGIT MEZATI",
    "date": 12312.1,
    "id": "asdasdasd",
    "quota": 12                        
}    
```
</details>





