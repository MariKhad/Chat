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
	AUTHORIZATION_CLOSE: document.querySelector('.authorization__header-close'),
	AUTHORIZATION_FORM: document.querySelector('.authorization__form'),
	AUTHORIZATION_INPUT: document.querySelector('.authorization__form > input')
}

export function createMessageNode(login, info, status) {
	let temp = document.getElementById(status);
	let message = temp.content.cloneNode(true);
	let messText = message.querySelector('.message__text');
	let messTime = message.querySelector('.message__time');

	messText.textContent = `${login}":" ${info}`;
	messTime.textContent = format(new Date(), "HH':'mm");

	return message;
}


export function hideDisplayAutorization() {
	CHAT_UI.BODY.classList.toggle('visible');
	CHAT_UI.BODY.classList.toggle('hidden');
	CHAT_UI.MODAL.classList.toggle('visible');
	CHAT_UI.MODAL.classList.toggle('hidden');
	CHAT_UI.AUTHORIZATION.classList.toggle('visible');
	CHAT_UI.AUTHORIZATION.classList.toggle('hidden');
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