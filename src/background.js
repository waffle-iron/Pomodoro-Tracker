// Electron's main process that controls the applications lifecycle

import { app, Menu, BrowserWindow} from 'electron';
import { devMenuTemplate } from './menu/dev_menu_template';
import { editMenuTemplate } from './menu/edit_menu_template';

import env from './env';

var mainWindow, width, height;

var init = function () {
    var menus = [editMenuTemplate];
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));

    width = env.name === 'development' ? 1000 : 450;
    height = env.name === 'development' ? 800 : 475;

    mainWindow = new BrowserWindow({width: width, height: height, frame: false, resizable: true});
}

app.on('ready', function () {
    init();

    mainWindow.loadURL('file://' + __dirname + '/app.html');

    if (env.name === 'development') {
        mainWindow.openDevTools();
    }
});

app.on('window-all-closed', function () {
    app.quit();
});
