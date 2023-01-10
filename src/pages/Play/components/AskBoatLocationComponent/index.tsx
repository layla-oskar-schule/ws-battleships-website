import { useContext, useState } from 'react';
import { GameFieldContext } from '../..';
import GameField from '../../../shared/GameField';

type AskBoatLocationComponentProps = {
	onClick: (x1: string, y1: number, x2: string, y2: number) => void;
	boatLength: number;
};

const AskBoatLocationComponent = ({
	boatLength,
	onClick,
}: AskBoatLocationComponentProps) => {
	const gameFields = useContext(GameFieldContext);
	const [x1Value, setX1Value] = useState<string>('');
	const [y1Value, setY1Value] = useState<number>(0);
	const [x2Value, setX2Value] = useState<string>('');
	const [y2Value, setY2Value] = useState<number>(0);

	return (
		<div>
			<h1>Place your boats</h1>
			<GameField data={gameFields[0]} />
			<label htmlFor="boatLength">
				Place a boat with the length of {boatLength}
			</label>
			<div>
				<div>
					<label htmlFor="x1Input">X1</label>
					<input
						type="string"
						id="x1Input"
						value={x1Value}
						onChange={e => setX1Value(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="y1Input">Y1</label>
					<input
						type="number"
						id="y1Input"
						value={y1Value}
						onChange={e => setY1Value(e.target.value as unknown as number)}
					/>
				</div>
			</div>
			<div>
				<div>
					<label htmlFor="x2Input">X1</label>
					<input
						type="string"
						id="x2Input"
						value={x1Value}
						onChange={e => setX2Value(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="y2Input">Y1</label>
					<input
						type="number"
						id="y2Input"
						value={y1Value}
						onChange={e => setY2Value(e.target.value as unknown as number)}
					/>
				</div>
			</div>
			<button onClick={() => onClick(x1Value, y1Value, x2Value, y2Value)}>Send</button>
		</div>
	);
};

export default AskBoatLocationComponent;
