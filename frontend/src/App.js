import './App.css';
import Header from './Header';
import Body from './Body';

function App() {
	function getRandomGreeting() {
		const greets = ["Morning", "Afternoon", "Evening", "Night"];
		const i = Math.floor(Math.random() * greets.length);
		return greets[i];
	}
	const greet = getRandomGreeting();
	return (
			<div className="App">
			<Header />
			<Body />
		</div>
	);
}

export default App;
