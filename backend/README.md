# RESTFUL API CODED FOR "BALIKLIOVA FISH AUCTION/BALIK MEZATI"

## Ignored prop. templates:

- Application.properities
```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5InnoDBDialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl=false
spring.datasource.url=jdbc:mysql://localhost:3306/fish?useSSL=false&serverTimezone=UTC&useLegacyDatetimeCode=false
spring.datasource.username=root
spring.datasource.password=12345678
```

The Architecture of the Implementation
MVC software architectural pattern is used in the project. Controller classes act as an interface between database and view components to process all incoming requests, manipulate data using the model components.Service classes handle the necessary business logic and functions for the controller classes. Model classes correspond to all the necessary data that is stored and the needed data-related logic.
The Technologies

Table of Contents
1. Java Spring Boot
2. MYSQL SQL structure engine
3. HTML5 Markup Language
4. CSS Style Sheet Language
5. Javascript / frameworks -> React.js
6. SSH
7. Git VCS

### What is the Java Spring framework?
Generally, web framework uses various libraries, and it implements many features for backend rendering, performs general behaviors and their responses.
Spring is a web framework, it's a Python module that lets you develop web applications easily. It's has a small and
easy-to-extend core: it's a microframework that doesn't include an ORM (Object Relational Manager) or such features.It does have many cool features like url routing, template engine.Moreover and finally, it includes jinja render language which makes dynamic data performing on html files..


### Why Java-Spring framework?
Java programming language is easy to implement.
Java spring framework is understandable. 
Object-oriented manners can be implemented.
Active communities and quick debugging.
How to implement Java Spring framework?
 go to spring initializer web page 
### What is MYSQL?
Mysql is query based free structure/Database system
SQL structure provided from its engine.
Mysql engine stores data in flexible
How to implement the MYSQL engine?
Basically you can go to the website.
### What is html ?
HTML, or HyperText Markup Language, allows web users to create and structure sections, paragraphs, and links using elements, tags, and attributes. However, it’s worth noting that HTML is not considered a programming language as it can’t create dynamic functionality.
It’s also worth noting that HTML is now considered an official web standard. The World Wide Web Consortium (W3C) maintains and develops HTML specifications, along with providing regular updates.
### Why html ?
Sir Timothy John Berners-Lee invented the modern internet which is WWW as every individual knows.
Berners also invented markup language which is html, and it is standard for W3C organization.
 Great majority of web applications, pages (% 99.9) uses html for standards.
### What is css?
Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.[ Citation [4]](wikipedia.org)
### Why css?
CSS is used to define styles for web pages, including the design, layout and variations in display can be changed
What is javascript?
JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World WideWeb, alongside HTML and CSS. Over 97% of websites use JavaScript on the client side for web page behavior, often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users' devices.[ citation [5]](wikipedia.org)

### Why javascript?
On many models with progress of technology, web applications required browser based dynamic models.
Using javascript will bring a new dynamic manner to application development.
SSH Technology


### What is ssh?
SSH, also known as Secure Shell , is a network protocol that gives users a secure way to access a computer over an unsecured network.

### Why ssh?
SSH technology generally for remote controlling and testing the server. In this web application , tests and deployment  can be implemented in a remote server.
With ssh technology no one can access the remote machine who does not have the key.
Cyber resilience of the system is the most important thing for any kind of bad situation.
What is the Git Version Control System?
Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

### Why Git?
Working with a big devops team is exhaustive for collaboration and complicated when assignments are collected in the main project.
It is the best way to use the version control system for everyone in this project.

Front-end Side
	We have used Javascript programming language and React library (they call themselves library not framework) to implement front-end. React is flexible due to component-based structure. Also it has a wide range of users (188k stars in Github Repo). Lastly, we have team members who have experience in ReactJS.
Server Side
	We have used Java programming language and Spring Boot framework to implement back-end. Spring is very flexible thanks to extensions and third party libraries. It simplifies and eases the process (Ex: Lombok getter-setter) greatly. Furthermore, Spring has Inversion of Control and Dependency Injection features so we focus on other stuff. Also, all team members have experience in Java.	
Storage Side
	We have used MySql on the storage side. MySql is a Relational Database Management System. We use it because it is free, has a high scalability option. Lastly, some of our team members have experience in MySql.

# API DOCUMANTATION

#### 1) URL => ```/api/customers``` _~~GET~~_:
```
- Shows all customers in db.
```


#### 2) URL => ```/api/fisherman``` _~~GET~~_:
```
- Shows all fishermans in db.
```

#### 3) URL => ```/api/admin``` _~~GET~~_:
```
- Shows all admins in db.
```
#### 3) URL => ```/api/members``` _~~GET~~_:
```
- Shows all members in db.
```
#### 4) URL => ```/api//loginget/{username}/{password}``` _~~GET~~_
```
- Getting user login function.
- username and password must be changed! this is for demo.
```
#### 5) URL => ```/api/signup/customer``` _~~POST~~_
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
#### 6) URL => ```/api/signup/member``` _~~POST~~_
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
#### 7) URL => ```/api/register-fisherman``` _~~POST~~_
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
#### 8) URL => ```/api/cooperativeHead/getCode``` _~~GET~~_
```
- Getting code for aucion function.
- Returns String code
```
#### 9) URL => ```/api/auction/fetchAuctions``` _~~GET~~_
```
- Getting all auctions.
- Returns list of auction objects.
```
#### 10) URL => ```/api/auction/add``` _~~POST~~_
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
