// Electron's main process
// -> Runs throughout application life cycle and manages the electron application

import path from 'path';
import url from 'url';
import { app, Menu, BrowserWindow } from 'electron';
import { devMenu } from './menu/dev_menu';

// Module that holds environment variables defined in config/env_xxx.json
import env from './env';

let mainWindow;

let setApplicationMenu = function () {
    let menus = [];
    if (env.name !== 'production') {
        menus.push(devMenu);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

let setWindow = function (width, height) {
    let options = {}
    options.width = width;
    options.height = env.name !== 'production' ? height + 50 : height;
    options.frame = env.name !== 'production' ? true : false;
    //TODO: make app responsive to allow it to be resizable
    options.resizable = false;

    return options
}

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
    let userDataPath = app.getPath('userData');
    app.setPath('userData', userDataPath + ' (' + env.name + ')');
}

app.on('ready', function () {
    setApplicationMenu();

    mainWindow = new BrowserWindow(setWindow(400,500));

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app.html'),
        protocol: 'file:',
        slashes: true
    }));

    if (env.name === 'development') {
        mainWindow.openDevTools();
    }
});

app.on('window-all-closed', function () {
    app.quit();
});
