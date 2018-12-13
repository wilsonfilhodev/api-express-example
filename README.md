# api-express-example
Example api rest using Node.js, Express, Mongoose and Jwt

## Running the project

```
$ git clone https://github.com/wilsonfilhodev/api-express-example.git
$ cd express-app
$ npm install
$ npm start
```

## Examples

* **POST** http://localhost:3000/auth/register (*Create new user*)
Fields required: name, email and password
* **POST** http://localhost:3000/auth/authenticate (*Authenticate in api and return token*)

* **GET** http://localhost:3000/projects/ (*Get projects*)
* **GET** http://localhost:3000/projects/ID_PROJECT (*Get one project*)
* **POST** http://localhost:3000/projects (*Create student*)
```

  Example data:
  
  {
	
    "title": "My project",
    "description": "Project description",
    "tasks": [{
      "title": "Title task",
      "assignedTo": "5c10456a85c2cf4c50cb7e57"
    }]
  }
  
```
* **DELETE** http://localhost:3000/projects/ID_PROJECT (*Delete one project*)
* **PUT** http://localhost:3000/alunos/projects/ID_PROJECT (*Update task data of project*)

## Authors

* **Wilson Filho**  - [Linkedin](https://www.linkedin.com/in/wilson-filho-4424b5bb)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
