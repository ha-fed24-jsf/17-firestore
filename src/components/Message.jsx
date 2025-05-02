import { useState } from 'react'
import { editMessage } from '../data/crud'

const Message = ({ message, deleteMessage, setMessages }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [text, setText] = useState(message.text)

	const handleSaveEdit = () => {
		if( isEditing ) {
			// uppdatera databasen
			console.log('TODO: Nu ska databasen uppdateras')
			editMessage(message.id, text, setMessages)
		}
		setIsEditing(!isEditing)
	}

	return (
		<div className="message">
			{isEditing ? (
				<input
					type="text"
					value={text}
					onChange={event => setText(event.target.value)}
					/>
			) : (
				<p> {message.text} </p>
			)}
			<p>
				{message.sender}
				<button onClick={handleSaveEdit}> {isEditing ? 'Spara' : 'Ändra'} </button>
				<button onClick={() => deleteMessage(message.id, setMessages)}> Ta bort </button>
			</p>
		</div>
	)
}

export default Message
