import Cookies from 'js-cookie';
import { CHAT_UI, createMessageNode, CHAT_KEY } from "./view.js";
import { modalWindowsHandler, openConfirmationWindow, closeModalWindow, openAutorizationWindow, setCookies } from "./view.js";
import { setAlert, PLACEHOLDERS } from "./view.js";

const URL = "mighty-cove-31255.herokuapp.com";

document.addEventListener("DOMContentLoaded", modalWindowsHandler);
document.addEventListener("DOMContentLoaded", setCookies);
document.addEventListener("DOMContentLoaded", openSocket);
document.addEventListener("DOMContentLoaded", changeLogin);



CHAT_UI.AUTHORIZATION_FORM.addEventListener('submit', getAuthorizationCode);
CHAT_UI.SETTINGS__FORM.addEventListener('submit', getLogin);
CHAT_UI.CONFIRMATION_FORM.addEventListener('submit', getToken);

async function openSocket(e) {
	e.preventDefault();
	if (Cookies.get('token') !== '') {
		TOKEN = Cookies.get('token');
		let socket = new WebSocket(`ws://${URL}/websockets?${TOKEN}`);
		alert('подождите соединения с сервером');
		try {
			socket.onopen = function (e) {
				alert("[open] Соединение установлено");
				alert("Отправляем данные на сервер");
				socket.send(JSON.stringify({ text: 'тестовый текст', }));
			};
			CHAT_UI.FORM.addEventListener('submit', function (e) {
				e.preventDefault();
				let messageText = CHAT_UI.INPUT.value;
				if (messageText !== '') {
					const login = (Cookies.get("login") !== '') ? Cookies.get("login") : "Я";
					socket.send(JSON.stringify({ text: `${messageText}`, }));
					CHAT_UI.INPUT.value = "";
				} else {
					setAlert(CHAT_UI.INPUT, PLACEHOLDERS.message, PLACEHOLDERS.alertMessage);
				}
				socket.onmessage = function (event) {
					let response = JSON.parse(event.data);
					console.log(response);
					let { text, user: { email, name }, createdAt
					} = response;
					console.log(createdAt);
					let message;
					if (email === Cookies.get('email')) {
						message = createMessageNode(name, text, createdAt, "sent__message");
					} else {
						message = createMessageNode(name, text, createdAt, "received__message");
					}
					CHAT_UI.WINDOW.prepend(message);
				};
			});
		} catch (error) {
			alert(`Не получилось соединениться с сервером, потому что: ${error.message}`);
		}

	} else {
		alert('Настройте соединение с сервером получив токен на почту');
		openAutorizationWindow();
	}


}

/* function addMessage(event, socket) {
	
} */


async function getAuthorizationCode(e) {
	e.preventDefault();
	const mail = CHAT_UI.AUTHORIZATION_INPUT.value;
	if (mail !== '') {
		Cookies.set('email', mail, { expires: 30 });
		const requestObject = {
			email: mail
		};

		try {
			await fetch(`https://${URL}/api/user`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify(requestObject),
			})
		} catch (err) {
			alert(err.name);
		} finally {
			alert("Запрос отправлен");
		}
		openConfirmationWindow();
	} else {
		setAlert(CHAT_UI.AUTHORIZATION_INPUT, PLACEHOLDERS.mail, PLACEHOLDERS.alertMail);
	}
}

async function getToken(event) {
	event.preventDefault();
	if (CHAT_UI.CONFIRMATION_INPUT.value !== '') {
		let TOKEN = CHAT_UI.CONFIRMATION_INPUT.value;
		Cookies.set('token', TOKEN, { expires: 1440 });
		openSocket();
	} else {
		setAlert(CHAT_UI.CONFIRMATION_INPUT, PLACEHOLDERS.code, PLACEHOLDERS.alertCode);
	}
}

function getLogin() {
	if (CHAT_UI.SETTINGS__INPUT.value !== "") {
		let login = CHAT_UI.SETTINGS__INPUT.value;
		closeModalWindow();
		Cookies.set('login', login, { expires: 1440 });
		changeLogin(login);
	}
	else {
		setAlert(CHAT_UI.SETTINGS__INPUT, PLACEHOLDERS.login, PLACEHOLDERS.alertLogin);
	}
}

async function changeLogin(e) {
	e.preventDefault();
	if (Cookies.get('login') !== '') {
		let login = Cookies.get('login');
		const requestObject = {
			name: login
		};
		try {
			await fetch(`https://${URL}/api/user`, {
				method: 'PATCH',
				headers: {
					'Content-type': 'application/json; charset=utf-8',
					'Authorization': `Bearer ${Cookies.get('token')}`,
				},
				body: JSON.stringify(requestObject),
			})
		} catch (err) {
			alert(err.name);
		}
	}
}