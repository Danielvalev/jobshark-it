<p align="center">
  <h2 align="center">JobShark-IT</h2>

  <p align="center">
    React project for sharing and searching for the best IT jobs. There are two layers of access. As a User and as an Administrator (who approves the newly posted jobs)
    <br />
    Deployed with Netlify: https://jobshark.netlify.app/
    <br />
    <a href="https://jobshark.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/Danielvalev/jobshark-it/issues">Report Bug</a>
    ·
    <a href="https://github.com/Danielvalev/jobshark-it/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#application-requirements">Application Requirements</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#structure">Structure</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

### Built With

* [React](https://react.dev/)
* [Firebase](https://firebase.google.com/)
* [Bootstrap](https://getbootstrap.com)
* [Ant Design](https://ant.design/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Application Requirements

1. Node.js
2. Firebase registration
3. Other packages listed in package.json

### Installation
Make sure you have already downloaded and install node.js

1. The first thing to do is to clone the repository:
 ```sh
$ git clone https://github.com/Danielvalev/jobshark-it
$ cd jobshark-it/client
`````````````

2. Install other packages:
- For MacOS: 
 ```sh
$ npm i
`````````````

- For Windows:
 ```sh
C:\Users\Name\jobshark-it\client> npm i
`````````````

3. Run Server
```sh
$ npm start
```

Expected result:

```
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000           

Note that the development build is not optimized.
To create a production build, use npm run build. 

webpack compiled successfully
```

4. Create a Firebase project and configure it with your Firebase credentials. See [Firebase documentation](https://firebase.google.com/docs/web/setup) for more information.

And navigate to jobshark-it homepage using `http://localhost:3000`.

#### Other syntaxes
To kill/stop the server 
> Ctrl + c

<!-- Structure -->
## Structure

```
client/
├── public/ # Contains the HTML and favicon files for the project
│   ├── index.html
│   └── favicon.ico
├── src/    # contains the source code of the project, and it is further divided into subfolders
│   ├── apis/   # contains the modules that interact with external APIs or perform other backend tasks
│   │   ├── authService.js
│   │   ├── jobService.js
│   │   └── userService.js
│   ├── components/   # contains all the reusable UI components used throughout the project
│   │   ├── DefaultLayout.js
│   │   ├── Loader.js
│   │   ├── PageTitle.js
│   │   ├── ProtectedRoute.js
│   │   └── PublicRoute.js
│   ├── pages/  # contains the main pages of the application
│   │   ├── admin/
│   │   │   ├── AllJobs.js
│   │   │   └── AllUsers.js
│   │   ├── user/
│   │   │   ├── postedjobs/
│   │   │   │   ├── index.js
│   │   │   │   └── NewEditJob.js
│   │   │   ├── profile/
│   │   │   │   ├── Education.js
│   │   │   │   ├── Experience.js
│   │   │   │   ├── index.js
│   │   │   │   └── PersonalINfo.js
│   │   │   └── AppliedJobs.js
│   │   ├── Dashboard.js
│   │   ├── Home.js
│   │   ├── JobPublicView.js
│   │   ├── JobView.js
│   │   ├── Login.js
│   │   └── Register.js
│   ├── redux/
│   │   ├── alertSlice.js
│   │   └── store.js
│   ├── stylessheets/   # contains the global styles used in the project
│   │   ├── custom-components.css
│   │   └── layout.css
│   ├── App.js  #  The main component for the project
│   ├── App.test.js
│   ├── firebaseConfig.js   # Configures the Firebase app and exports the Firebase database object
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   └── setupTests.js
├── package.json
└── README.md
```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/Danielvalev/jobshark-it/issues) for a list of proposed features (and known issues).


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Daniel Valev - danielvalev89@gmail.com

Project Link: [https://github.com/Danielvalev/jobshark-it](https://github.com/Danielvalev/jobshark-it)
