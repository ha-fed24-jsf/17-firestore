// import { useState } from 'react'

import './App.css'

function App() {
	// const [count, setCount] = useState(0)

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
				<div className="message">
					<p> Hallå eller </p>
					<p> Nisse Nilsson, 12:45 </p>
				</div>
				<div className="message">
					<p> Hallå igen </p>
					<p> Nisse Nilsson, alldeles nyss </p>
				</div>
			</div>


		</main>
		</div>
	)
}

export default App
