import Cookies from 'js-cookie';
import { CHAT_UI, createMessageNode, hideDisplayAutorization } from "./view.js";

const login = "Я";

CHAT_UI.FORM.addEventListener('submit', addMessage);
CHAT_UI.ENTER.addEventListener('click', hideDisplayAutorization);
CHAT_UI.AUTHORIZATION_CLOSE.addEventListener('click', hideDisplayAutorization);
CHAT_UI.AUTHORIZATION_FORM.addEventListener('submit', getAuthorizationCode);


function addMessage(event) {
	event.preventDefault();
	let messageText = CHAT_UI.INPUT.value;
	if (messageText !== '') {
		let message = createMessageNode(login, messageText, "sent__message");
		CHAT_UI.WINDOW.append(message);
		CHAT_UI.INPUT.value = "";
	} else {
		alert("Введите сообщение")
	}
}

function getAuthorizationCode(e) {
	e.preventDefault();
	Cookies.set('email', CHAT_UI.AUTHORIZATION_INPUT.value, { expires: 30 });
	let requestObject = {
		email: CHAT_UI.AUTHORIZATION_INPUT.value
	};
	console.log(JSON.stringify(requestObject))

	try {
		fetch('https://mighty-cove-31255.herokuapp.com/api/user', {
			method: 'POST',
			headers: {
				'Content-type': 'application/ json; charset=utf-8'
			},
			body: JSON.stringify(requestObject),
		})
	} catch (err) {
		alert(err.name);
	} finally {
		alert("Запрос отправлен");
	}
}
