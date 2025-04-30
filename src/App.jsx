import { useState, useEffect } from 'react'
import './App.css'
import { deleteMessage, getMessages, sendMessage } from './data/crud.js';

function App() {
	const [messages, setMessages] = useState([]);
	const [name, setName] = useState('')
	const [draft, setDraft] = useState('')

	useEffect(() => {
		getMessages(setMessages)
	}, []); // Tom array som dependency gör att detta bara körs en gång vid mount

	const handleSendMessage = async () => {
		console.log('Before send message...', draft, name)
		await sendMessage(draft, name, setMessages)
		console.log('After send message...')
	}

	return (
		<div className="app">
		<h1> 🔥Heta chatten🔥 </h1>
		<main>
			<section className="auth">
				<label htmlFor=""> Ditt namn </label>
				<input type="text"
					onChange={event => setName(event.target.value)}
					value={name}
					/>
			</section>

			<section className="send">
				<label htmlFor=""> Säg något + Enter </label>
				<textarea name="" id="" rows="4"
					onChange={event => setDraft(event.target.value)}
					value={draft}
					/>
				<div>
					<button onClick={handleSendMessage}> Skicka </button>
				</div>
			</section>

			<div className="messages">
				{messages.map(message => (
					<div key={message.id} className="message">
						<p> {message.text} </p>
						<p>
							{message.sender}
							<button onClick={() => deleteMessage(message.id, setMessages)}> Ta bort </button>
						</p>
					</div>
				))}
			</div>


		</main>
		</div>
	)
}

export default App
