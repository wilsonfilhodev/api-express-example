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
* **GET** http://localhost:3000/alunos/ID_ONE_ALUNO (*Get student*)
* **POST** http://localhost:3000/alunos (*Create student*)
* **DELETE** http://localhost:3000/alunos/ID_ONE_ALUNO (*Delete one student*)
* **PUT** http://localhost:3000/alunos/ID_ONE_ALUNO (*Update one student*)

## Authors

* **Wilson Filho**  - [Linkedin](https://www.linkedin.com/in/wilson-filho-4424b5bb)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
