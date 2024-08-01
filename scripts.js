document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

let step = 0;
let userName = '', userDeparture = '', userDestination = '', userDate = '';

function sendMessage() {
    console.log('sendMessage called');  // Debugging line
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === '') return;

    addMessage(userInput, 'user-message');
    document.getElementById('user-input').value = '';

    setTimeout(() => {
        botResponse(userInput);
    }, 1000);
}

function addMessage(text, className) {
    const chatBox = document.getElementById('chat-box');
    const message = document.createElement('div');
    message.classList.add('message', className);
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function botResponse(userInput) {
    let botMessage = '';

    switch (step) {
        case 0:
            userName = userInput;
            botMessage = `Nice to meet you, ${userName}! Where will you be departing from?`;
            step++;
            break;
        case 1:
            userDeparture = userInput;
            botMessage = `Great! Where are you heading to?`;
            step++;
            break;
        case 2:
            userDestination = userInput;
            botMessage = `Got it. When would you like to depart? (Please enter date in YYYY-MM-DD format)`;
            step++;
            break;
        case 3:
            if (!isValidDate(userInput)) {
                botMessage = `Please enter a valid date in YYYY-MM-DD format.`;
            } else {
                userDate = userInput;
                botMessage = `Thank you, ${userName}. Here are your booking details:\n\nDeparture: ${userDeparture}\nDestination: ${userDestination}\nDate: ${userDate}\n\nWould you like to confirm the booking? (yes/no)`;
                step++;
            }
            break;
        case 4:
            if (userInput.toLowerCase() === 'yes') {
                botMessage = `Your booking is confirmed! Have a safe trip, ${userName}!`;
            } else {
                botMessage = `Booking cancelled. If you need to book again, just let me know.`;
            }
            step = 0;
            break;
        default:
            botMessage = `I'm not sure what you mean. Could you please provide the information again?`;
            step = 0;
            break;
    }

    addMessage(botMessage, 'bot-message');
}

function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) return false;

    const date = new Date(dateString);
    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) return false;

    return dateString === date.toISOString().split('T')[0];
}
