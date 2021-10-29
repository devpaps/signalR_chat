import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

type SendMessageFormProps = {
	sendMessage: (message: string) => void;
};

export default function SendMessageForm({ sendMessage }: SendMessageFormProps) {
	const [message, setMessage] = useState('');

	return (
		<Form
			style={styles.main}
			onSubmit={(e) => {
				e.preventDefault();
				sendMessage(message);
				setMessage('');
			}}
		>
			<InputGroup>
				<FormControl
					type='user'
					placeholder='Type a message'
					onChange={(e) => setMessage(e.target.value)}
					value={message}
				/>
				<div style={styles.buttonContainer}>
					<Button variant='primary' type='submit' disabled={!message}>
						Send
					</Button>
				</div>
			</InputGroup>
		</Form>
	);
}

const styles = {
	main: {
		gridArea: '5 / 3 / 6 / 11',
	},
	buttonContainer: {
		marginLeft: '1rem',
	},
} as const;
