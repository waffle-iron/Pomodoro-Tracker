// Electron's main process that controls the applications lifecycle

import { app, Menu, BrowserWindow} from 'electron';
import { devMenuTemplate } from './menu/dev_menu_template';
import { editMenuTemplate } from './menu/edit_menu_template';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow;

var setApplicationMenu = function () {
    var menus = [editMenuTemplate];
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

app.on('ready', function () {
    setApplicationMenu();

    var mainWindow = new BrowserWindow({width: 450, height: 500, frame: false, resizable: true});

    mainWindow.loadURL('file://' + __dirname + '/app.html');

    if (env.name === 'development') {
        mainWindow.openDevTools();
    }


});

app.on('window-all-closed', function () {
    app.quit();
});
