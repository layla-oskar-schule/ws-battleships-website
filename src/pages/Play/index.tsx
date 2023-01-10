import { createContext, useState } from 'react';
import AskBoatLocationComponent from './components/AskBoatLocationComponent';
import AskGameNameComponent from './components/AskGameNameComponent';
import AskUserNameComponent from './components/AskUserNameComponent';
import './play.css';

export const GameFieldContext = createContext<number[][][]>(Array(0));

const Play = () => {
	const [displayedComponent, setDisplayedComponent] = useState<JSX.Element>(
		<h1>Play</h1>,
	);
	const [gameFields, setGameFields] = useState<number[][][]>(
		Array.from(Array(2), () => Array(10).fill(Array(10).fill(0)) as number[][]),
	);

	const socket = new WebSocket('ws://localhost:5083/game');

	socket.onopen = () => {
		console.log('Connected to server');
	};

	socket.onmessage = event => {
		console.log(event.data);
		if (event.data == 's_askUserName$') {
			setDisplayedComponent(<AskUserNameComponent onClick={handleUserName} />);
		}
		if (event.data == 's_askGameName') {
			setDisplayedComponent(<AskGameNameComponent onClick={handleGameName} />);
		}

		if (event.data == 's_askBoatLocation') {
			const boatLength: number = parseInt(event.data.split('$')[1]);

			setDisplayedComponent(
				<AskBoatLocationComponent boatLength={boatLength} onClick={handleBoatLocation} />,
			);
		}

		if (event.data == 's_sendGameField') {
			setGameFields(JSON.parse(event.data.split('$')[1]));
		}
	};

	socket.onclose = () => {
		console.log('Disconnected from server');
	};

	const handleUserName = (value: string) => {
		socket.send('p_sendUserName$' + value);
	};

	const handleGameName = (value: string) => {
		socket.send('p_sendGameName$' + value);
	};

	const handleBoatLocation = (x1: string, y1: number, x2: string, y2: number) => {
		socket.send('p_sendBoatLocation$["' + x1 + ';' + y1 + '","' + x2 + ';' + y2 + '"]');
	};

	return (
		<GameFieldContext.Provider value={gameFields}>{displayedComponent}</GameFieldContext.Provider>
	);
};
export default Play;
