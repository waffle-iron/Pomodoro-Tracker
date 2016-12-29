# Pomodoro-Tracker
A Pomodoro Tracker application written in Angular JS. Uses the electron framework to allow it to run as a standalone application.

### Usage:
`git clone https://github.com/David29595/Pomodoro-Tracker.git`
<br/>`npm install`
<br/>`npm start`

### Dev Usage
`git clone https://github.com/David29595/Pomodoro-Tracker.git`
<br/>`npm install`
<br/>`gulp start` to start the app with developer features enabled

###### Folder Structure: 
Develop code that needs to be pre-compiled in the `src` folder (eg: `.less`, `ES6 code`). Sources that do not need to be precompiled should be placed in the `app` folder (eg: `.html`). 

When the build process runs, it takes the compiles code from the `src` directory and transfers it into the `app` directory, where it can be used in currently supported (no ES6 syntax) by electron.

### Other useful commands
`gulp build` build the application's source
<br/>`gulp watch` create a watch oin the application's source that updates the bundle when the `src` directory changes
