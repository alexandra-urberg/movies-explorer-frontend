# movies-explorer-frontend

This is the final project/diploma for Yandex-Practicum Bootcamp(frontend version)

**Figma Layout example: https://www.figma.com/file/cASM20ikAsPlTi2doec68Q/Diploma?node-id=344%3A0**

**[Link to the backend https://github.com/alexandra-stepanova/movies-explorer-api](https://github.com/alexandra-stepanova/movies-explorer-api)**
##

<code><img height="500" src="https://github.com/alexandra-stepanova/movies-explorer-frontend/blob/level-3/public/%20movies_searcher.gif"></code>

##

This is an application written in React in a functional style. The application allows you to find and save movies as a favorites on a separate page. The movies are beiing parsed fron the other Api.

Authorization is implemented utilasing cookies: to simply access the personal pages user needs to register and authorized only once. Internal routers are protected from unauthorized users. All information about movies, saved movies, filtered movies, e.t.c. is stored tored at the local storage until user log out.

Requests to the backend implemented using Promises,. Preloaders are running at the time of executing requests. All Promises are terminated by Catch. In case of errors, messages are shown to the user.

Instant validation of inputs at the forms (registration form, authorization form, profile and search line) is implemented. The buttons are blocked as long as the fields are invalid. A custom hook was made for validation.
Implemented a filter for short films.
Implemented page 404 when trying to access a non-existent page.
Implemented a button Loading(Preloader) for all changes. The number of uploaded and initial movies on the page depends on the screen resolution.

**The following stack was used during development of the project:**
1. Html;
2. Bem
3. Scss(variales, Flex, Grid and e.t.c);
4. JS;
5. React;


**Startup commands**

 To install dependencies
```sh
npm i
```

To start the server http://localhost:3000/
```sh
npm start
```

To build the project
```sh
npm run build
```

Prepared by Alexandra Stepanova
