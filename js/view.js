import { format } from 'date-fns';

export const CHAT_UI = {
	BODY: document.querySelector('.chat__body'),
	WINDOW: document.querySelector('.chat__window'),
	INPUT: document.querySelector('.chat__input'),
	ENTER: document.querySelector('.chat__enter'),
	FORM: document.querySelector('.chat__form'),
	SUBMIT: document.querySelector('.chat__submit'),
	MODAL: document.querySelector('.modal'),
	AUTHORIZATION: document.querySelector('.authorization'),
	AUTHORIZATION_CLOSE: document.querySelector('.autorization__header-close'),
	AUTHORIZATION_BACK: document.querySelector('.autorization__footer-back'),
	AUTHORIZATION_FORM: document.querySelector('.authorization__form'),
	AUTHORIZATION_INPUT: document.querySelector('.authorization__form > input'),
	CONFIRMATION: document.querySelector('.confirmation'),
	CONFIRMATION_CLOSE: document.querySelector('.confirmation__header-close'),
	CONFIRMATION_BACK: document.querySelector('.confirmation__footer-back'),
	CONFIRMATION_FORM: document.querySelector('.confirmation__form'),
	CONFIRMATION_INPUT: document.querySelector('.confirmation__form > input'),
	SETTINGS__OPEN: document.querySelector('.chat__settings'),
	SETTINGS: document.querySelector('.settings'),
	SETTINGS__CLOSE: document.querySelector('.settings__header-close'),
}

export const CHAT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJlbWFpbCI6InV0YWJvbmQ4OUBnbWFpbC5jb20iLCJpYXQiOjE2NTQxNjA1NjksImV4cCI6MTY1NDYwNjk2OX0.k0a8NQ1SDrFHgqatUBNfYydaE - Ux_0Y6REBDytcI5vE";

export function modalWindowsHandler() {
	CHAT_UI.ENTER.addEventListener('click', openAutorizationWindow);
	CHAT_UI.AUTHORIZATION_CLOSE.addEventListener('click', closeModalWindow);
	CHAT_UI.AUTHORIZATION_BACK.addEventListener('click', closeModalWindow);
	CHAT_UI.CONFIRMATION_CLOSE.addEventListener('click', closeModalWindow);
	CHAT_UI.CONFIRMATION_BACK.addEventListener('click', backToAutorizationWindow);
	CHAT_UI.SETTINGS__OPEN.addEventListener('click', openSettingsWindow);
	CHAT_UI.SETTINGS__CLOSE.addEventListener('click', closeModalWindow);
}

export function createMessageNode(login, info, status) {
	let temp = document.getElementById(status);
	let message = temp.content.cloneNode(true);
	let messText = message.querySelector('.message__text');
	let messTime = message.querySelector('.message__time');

	messText.textContent = `${login}: ${info}`;
	messTime.textContent = format(new Date(), "HH':'mm");

	return message;
}


function openAutorizationWindow() {
	hideChatBody();
	/* hideSettings();
	hideConfirmation(); */
	displayModalWindow();
	displayAutorization();
}

export function openConfirmationWindow() {
	hideAutorization();
	hideSettings();
	displayConfirmation();
	displayModalWindow();
}

function closeModalWindow() {
	hideConfirmation();
	hideAutorization();
	hideSettings();
	hideModalWindow();
	displayChatBody();
}

function backToAutorizationWindow() {
	hideConfirmation();
	displayAutorization();
}

function openSettingsWindow() {
	hideChatBody();
	displayModalWindow();
	displaySettings();
}

function displayChatBody() {
	CHAT_UI.BODY.classList.add('visible');
	CHAT_UI.BODY.classList.remove('hidden');
}

function hideChatBody() {
	CHAT_UI.BODY.classList.remove('visible');
	CHAT_UI.BODY.classList.add('hidden');
}

function displayModalWindow() {
	CHAT_UI.MODAL.classList.add('visible');
	CHAT_UI.MODAL.classList.remove('hidden');
}

function hideModalWindow() {
	CHAT_UI.MODAL.classList.remove('visible');
	CHAT_UI.MODAL.classList.add('hidden');
}

function displayAutorization() {
	CHAT_UI.AUTHORIZATION.classList.add('visible');
	CHAT_UI.AUTHORIZATION.classList.remove('hidden');
}

function hideAutorization() {
	CHAT_UI.AUTHORIZATION.classList.remove('visible');
	CHAT_UI.AUTHORIZATION.classList.add('hidden');
}

function displayConfirmation() {
	CHAT_UI.CONFIRMATION.classList.add('visible');
	CHAT_UI.CONFIRMATION.classList.remove('hidden');
}

function hideConfirmation() {
	CHAT_UI.CONFIRMATION.classList.remove('visible');
	CHAT_UI.CONFIRMATION.classList.add('hidden');
}

function hideSettings() {
	CHAT_UI.SETTINGS.classList.remove('visible');
	CHAT_UI.SETTINGS.classList.add('hidden');
}

function displaySettings() {
	CHAT_UI.SETTINGS.classList.add('visible');
	CHAT_UI.SETTINGS.classList.remove('hidden');
}
/* export function createMessageNode(login, info) {
	let message = document.createElement('div');
	message.classList.add('message');
	let text = document.createElement('p');
	text.textContent = `${login}: ${info}`;
	let time = document.createElement('p');
	time.classList.add('message__time');
	time.textContent = format(new Date(), "H':'m");
	message.append(text);
	message.append(time);
	return message;
} */