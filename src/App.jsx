import { useState, useEffect } from 'react'
import { doc, addDoc, collection, getDocs, deleteDoc } from 'firebase/firestore'
import { db } from './data/database.js'

import './App.css'

function App() {
	const [messages, setMessages] = useState([]);
	const [name, setName] = useState('')
	const [draft, setDraft] = useState('')

	useEffect(() => {
		const getMessages = async () => {
			const messagesCollection = collection(db, 'messages');
			const messagesSnapshot = await getDocs(messagesCollection);
			const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			setMessages(messagesList);
			console.log('App getMessages, messages=', messagesList)
		};

		getMessages();
	}, []); // Tom array som dependency gör att detta bara körs en gång vid mount

	const sendMessage = async () => {
		console.log('App sendMessage')
		try {
			const messagesCollection = collection(db, 'messages'); // Referera till "messages"-collectionen

			// Skapa ett nytt dokument i "messages"-collectionen
			const messageObject = {
				text: draft, // Innehållet i meddelandet
				timestamp: Date.now(), // Tidsstämpel för när meddelandet skickades
				sender: name,
				receiver: 'random'
			}
			const nyttMeddelandeRef = await addDoc(messagesCollection, messageObject);

			console.log('Meddelande skickat med ID: ', nyttMeddelandeRef.id);
			const messagesSnapshot = await getDocs(messagesCollection);
			const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			setMessages(messagesList);
			return nyttMeddelandeRef; // Returnera referensen till det nya dokumentet

		} catch (error) {
			console.error('Fel vid skickande av meddelande: ', error);
			throw error; // Kasta felet vidare för att hantera det högre upp i anropsstacken
		}
	}

	const deleteMessage = async messageId => {
		// Skapa referens till dokumentet som ska tas bort
		const messageDocRef = doc(db, 'messages', messageId);

		// Ta bort dokumentet
		await deleteDoc(messageDocRef);

		console.log(`Dokumentet med ID ${messageId} har tagits bort.`);

		const messagesCollection = collection(db, 'messages');
		const messagesSnapshot = await getDocs(messagesCollection);
		const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
		setMessages(messagesList);
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
				<button onClick={sendMessage}> Skicka </button>
				</div>
			</section>

			<div className="messages">
				{messages.map(message => (
					<div key={message.id} className="message">
						<p> {message.text} </p>
						<p>
							{message.sender}
							<button onClick={() => deleteMessage(message.id)}> Ta bort </button>
						</p>
					</div>
				))}
			</div>


		</main>
		</div>
	)
}

export default App

/*
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { app } from './firebaseConfig'; // Se till att sökvägen stämmer

function MinKomponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const hämtameddelanden = async () => {
      const db = getFirestore(app);
      const messagesCollection = collection(db, 'messages');
      const messagesSnapshot = await getDocs(messagesCollection);
      const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesList);
    };

    hämtameddelanden();
  }, []); // Tom array som dependency gör att detta bara körs en gång vid mount

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          { Här renderar du dina meddelanden }
          <p>{message.text}</p> { Antag att du har ett fält som heter 'text' }
        </div>
      ))}
    </div>
  );
}

export default MinKomponent;

*/