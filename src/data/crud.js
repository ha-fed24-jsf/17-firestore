import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./database.js";

async function getMessages(setMessages) {
	const messagesCollection = collection(db, 'messages');
	const messagesSnapshot = await getDocs(messagesCollection);
	const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	setMessages(messagesList);
	console.log('App getMessages, messages=', messagesList)
}

async function sendMessage(draft, name, setMessages) {
	try {
		const messagesCollection = collection(db, 'messages'); // Referera till "messages"-collectionen

		// Skapa ett nytt dokument i "messages"-collectionen
		const messageObject = {
			text: draft, // Innehållet i meddelandet
			timestamp: Date.now(), // Tidsstämpel för när meddelandet skickades
			sender: name,
			receiver: 'random'
		}
		const newMessageRef = await addDoc(messagesCollection, messageObject);

		console.log('Meddelande skickat med ID: ', newMessageRef.id);
		getMessages(setMessages)
		return newMessageRef; // Returnera referensen till det nya dokumentet

	} catch (error) {
		console.error('Fel vid skickande av meddelande: ', error);
		throw error; // Kasta felet vidare för att hantera det högre upp i anropsstacken
	}
}

async function deleteMessage(messageId, setMessages) {
	// Skapa referens till dokumentet som ska tas bort
	const messageDocRef = doc(db, 'messages', messageId);

	// Ta bort dokumentet
	await deleteDoc(messageDocRef);

	console.log(`Dokumentet med ID ${messageId} har tagits bort.`);

	getMessages(setMessages)
}

async function editMessage(messageId, newText, setMessages) {
	const messageRef = doc(db, "messages", messageId); // Referens till dokumentet

	try {
		await updateDoc(messageRef, {
			text: newText // Uppdatera text-fältet
		})
		console.log("Dokument uppdaterat!")
		getMessages(setMessages)

	} catch (e) {
		console.error("Fel vid uppdatering av dokument: ", e)
	}
}

export { getMessages, sendMessage, deleteMessage, editMessage }
