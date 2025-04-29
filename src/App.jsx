import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './data/database.js'

import './App.css'

function App() {
	const [messages, setMessages] = useState([]);

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
	return (
		<div className="app">
		<h1> 🔥Heta chatten🔥 </h1>
		<main>


			<section className="auth">
				<label htmlFor=""> Ditt namn </label>
				<input type="text" />
				<button> Nu kör vi </button>
			</section>

				<section className="send">
				<label htmlFor=""> Säg något + Enter </label>
				<textarea name="" id="" rows="4"></textarea>
				<div>
				<button> Skicka </button>
				</div>
			</section>

			<div className="messages">
				{messages.map(message => (
					<div key={message.id} className="message">
						<p> {message.text} </p>
						<p> {message.sender} </p>
					</div>
				))}
				{/* <div className="message">
					<p> Hallå eller </p>
					<p> Nisse Nilsson, 12:45 </p>
				</div>
				<div className="message">
					<p> Hallå igen </p>
					<p> Nisse Nilsson, alldeles nyss </p>
				</div> */}
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