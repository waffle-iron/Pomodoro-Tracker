// Application starting point

import os from 'os';
import { remote, BrowserWindow } from 'electron';
import jetpack from 'fs-jetpack';
import { app } from './pomodoro_tracker/pomodoro_tracker.js'; // pomodorro_tracker source code

var app = remote.app;

//TODO: Find a better place to put this code
function init() {
  document.getElementById("close-btn").addEventListener("click", function (e) {
       app.quit();
  });
  document.getElementById("min-btn").addEventListener("click", function (e) {
       remote.BrowserWindow.getFocusedWindow().minimize();
  });
 };

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
       init();
  }
};
