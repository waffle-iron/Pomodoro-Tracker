// Application starting point

import os from 'os';
import { remote, BrowserWindow } from 'electron';
import jetpack from 'fs-jetpack';
import { app } from './pomodorro_tracker/pomodorro_tracker.js'; // pomodorro_tracker source code

var app = remote.app;

function init() {
  document.getElementById("close-btn").addEventListener("click", function (e) {
       app.quit();
  });
 };

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
       init();
  }
};
