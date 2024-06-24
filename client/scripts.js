document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messageList = document.getElementById('message-list');

    // Fetch and display messages on page load
    fetchMessages();

    messageForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const text = messageInput.value.trim();
        if (text) {
            const newMessage = await addMessage(text);
            displayMessage(newMessage);
            messageInput.value = '';
        }
    });

    
    async function fetchMessages() {
        try {
            const response = await fetch('/api/biscuits');
            const messages = await response.json();
            messages.forEach(displayMessage);
        } catch (error) {
            console.error('Error fetching biscuits:', error);
        }
    }

    async function addMessage(text) {
        try {
            const response = await fetch('/api/biscuits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding message:', error);
        }
    }

    function displayMessage(message) {
        const listItem = document.createElement('li');
        listItem.textContent = message.text;
        messageList.prepend(listItem);
    }


});
