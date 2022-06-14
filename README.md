# SamMovies-client
 

## Description
This project is using React to build the client-side for an application called sammovies based on its existing server-side code (REST API and database).

### What technology usage and why?

For the frontend of my SamMovies application I chose **React**. The main reasons are
* type of application: I need a library helping me build the UI of my app. React is suited best for the view side of the mvc approach and its virtual DOM ensures faster rendering of views
* scope: The component-based nature of React allows me to increase the scope of my web application with little to no performance issues or concerns about entropy.
* good documentation: for a beginner like me, it is important that the tools I use are well documented, so that I can understand the different components I work with. Another factor in my decision was, that it is kept up to date. In case of a library developed and maintained by Facebook, that is not a problem.
* popularity: React is in high demand at the moment. This can be seen in job ad, the stars on GitHub (187k) as well as the contributions to stack overflow. This support in the developer community ensures that Il will eventually find solutions when troubleshooting.

* mobile version: with its associated ecosystem of tools, React is also a good springboard for my next project, where I want to use React Native for a mobile application. So getting familiar with React first is valuable.

As a build tool I used **Parcel**, because it
* requires minimal configuration
* has fast bundle times
* is well-documented
* actively maintained
* works automatically with a variety of files
* offers some very useful features, such as building and serving code. Very helpful is also that it refreshes the browser every time the code changes (support for React Fast Refresh)

Further information on my environment:
* Node 16.15.1
* parcel 2.0.0-rc.0
* Chrome


### Key features

Main view
* Returns a list of ALL movies to the user (each listed item with an image, title, and
description)
* Sorting and filtering
* Ability to select a movie for more details

Single movie view
* Returns data (description, genre, director, image) about a single movie to the user
* Allows users to add a movie to their list of favorites

Login view
* Allows users to log in with a username and password

* Registration view
* Allows new users to register (username, password, email, birthday)

Genre view
* Returns data about a genre, with a name and description
* Displays example movies

Director view
* Returns data about a director (name, bio, birth year, death year)
* Displays example movies

Profile view
* Allows users to update their user info (username, password, email, date of birth)
* Allows existing users to deregister
* Displays favorite movies
* Allows users to remove a movie from their list of favorites

Single movie view and all movies views
* Allow users to see which actors star in which movies
* Allow users to view more information about different movies, such as the release date and the movie rating

### What challenges did I face, what did I learn? 

... from installing React
* in 2021 React 18 introduced a new root API, namely ReactDOM.createRoot. It is no longer necessary to pass the container into the render. This means that one needs to  replace render with createRoot. For more information, click here https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html

... from installing Parcel
* Project setup: in the package.json the entry point may not be "main", because main is used as the output file of the build. Instead define the source code for the library as follows:
```bash
"source": "src/index.html"
```
Use index.html as entry point for build process: parcel src/index.html

* Parcel: the command parcel src/index.html threw an error, saying
```bash
@parcel/package-manager: Could not find module "@parcel/transformer-sass" satisfying 2.0.0-rc.0
```
the solution was to remove the @oarcel/transformer-sass:^2.6.0 from the package.json, run npm install. As a result the version 2.0.0-rc.0 was installed and added as a dependencies.

* Parcel build process threw error, which was solved by adding type="module" to script tag in index.html
* add to package.json
```bash
"start": "parcel", // parcel watch + dev server
"watch": "parcel watch", // parcel build + automatic reload
"build": "parcel build"
```

* There is a new version of react-router-dom (6.3.0) which differs significantly from the version used by CF (v.5.3.0). I had to downgrade to the older version in order to be able to follow the directions provided by CF for routing between the views.

* React Redux has some pitfalls when loading data from an API (in this case, waiting for the user and movies state to be successfully set before setting the favorite movies state). Therefore, try using Redux toolkit (RTK) to fix this!

* Avoid passing down props to more than one compnent, bad practice! (props drilling) --> Use state managment! (e.g., Redux)

## How to install and run the project ...

### ... as a developer, who wants to work with the project
1. Clone or download repository ...
```bash
git clone https://github.com/samsepehri/movie_api.git
```

2. Run parcel to build
```bash
parcel src/index.html
```

### ... as a movie enthusiast, who wants to see the movies
-- not hosted yet, TBD --

## Technical Requirements (according to project brief)
* SPA application built using React
* Navigate between views using react-router-dom
* Use Parcel as build tool
* Use react-bootstrap for UI
* Use React Redux for state management (respecting the Flux pattern)
* Use both class and function components
* Use axios to connect to API (providing user and movie information)


## Development Process of the Client-Side for Sammovies Application

### Create React components for each view
* Main View routes to all sub views using react-router-dom
* Create functional component for each sub view // distinct functionality in view
* Use bootstrap Card component to create Movie card for each movie

### Connect to database via axios
* Get data on movies and users from API using axios library

### Use Redux for state management
* User & movie data is accessed and modified from different components --> Use redux to mangage state in one place (store)
* Same for favorite movies --> Has to be loaded once both user and movie data states are successfully set

### TBD: Host application! (e.g., on Netlify)