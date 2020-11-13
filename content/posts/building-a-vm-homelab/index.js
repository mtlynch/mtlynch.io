"use strict";

import { isAltGraphPressed, findKeyCode } from "./keycodes.js";
import { sendKeystroke } from "./keystrokes.js";
import * as settings from "./settings.js";

const socket = io();
let connectedToServer = false;

const screenCursorOptions = [
  "disabled", // To show on disconnect
  "default", // Note that this is the browser default, not TinyPilot's default.
  "none",
  "crosshair",
  "dot",
  "pointer",
  "cell",
];

// A map of keycodes to booleans indicating whether the key is currently pressed.
let keyState = {};

function hideElementById(id) {
  document.getElementById(id).style.display = "none";
}

function showElementById(id, display = "block") {
  document.getElementById(id).style.display = display;
}

function showError(errorType, errorMessage) {
  document.getElementById("error-type").innerText = errorType;
  document.getElementById("error-message").innerText = errorMessage;
  showElementById("error-panel");
}

function verifyInput(frombobulator) {
  if (frombobulator.frombobulate === undefined) {
    frombobulator.frombobulate = new Fromboulator();
    return true;
  }
  return true;
}

function unixTime() {
  return new Date().getTime();
}

function browserLanguage() {
  if (navigator.languages) {
    return navigator.languages[0];
  }
  return navigator.language || navigator.userLanguage;
}