// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

import os from 'os';
import { remote } from 'electron';
import jetpack from 'fs-jetpack';
import env from './env';
import { app } from './pomodoro_tracker/pomodoro_tracker'
import angular from 'angular'

console.log('Loaded environment variables:', env);

let app = remote.app;
let appDir = jetpack.cwd(app.getAppPath());

document.addEventListener('DOMContentLoaded', function () {
    let closeBtn = document.getElementById("close-btn")
    let minBtn = document.getElementById("min-btn")

    closeBtn.addEventListener("click", function (e) {
        app.quit();
    });
    minBtn.addEventListener("click", function (e) {
        remote.BrowserWindow.getFocusedWindow().minimize();
     });
});
