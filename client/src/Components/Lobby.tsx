import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

type Props = {
	joinRoom: Function;
};

export default function Lobby({ joinRoom }: Props) {
	const [user, setUser] = useState('');
	const [room, setRoom] = useState('');

	return (
		<Form
			style={styles.lobby}
			onSubmit={(e) => {
				e.preventDefault();
				joinRoom(user, room);
			}}
		>
			<div>
				<div style={{ marginBottom: '1rem' }}>
					<label style={styles.formLabel} htmlFor='user'>
						Username
					</label>
					<input
						id='user'
						style={styles.formControl}
						placeholder='Enter your username'
						onChange={(e) => setUser(e.target.value)}
					/>
				</div>
				<div>
					<label style={styles.formLabel} htmlFor='room'>
						Chatroom
					</label>
					<input
						id='room'
						style={styles.formControl}
						placeholder='Enter which chatroom'
						onChange={(e) => setRoom(e.target.value.toUpperCase())}
					/>
				</div>
			</div>
			<Button style={styles.button} type='submit' disabled={!user || !room}>
				Join
			</Button>
		</Form>
	);
}

const styles = {
	lobby: {
		width: '400px',
		margin: 'auto',
		fontFamily: 'Ubuntu, sans-serif',
	},
	button: {
		color: '#f1f1f1',
		marginTop: '30px',
		marginBottom: '40px',
		backgroundColor: '#198754',
		borderColor: '#198754',
	},
	formLabel: {
		color: '#3A434A',
		textAlign: 'left',
		marginBottom: '0.5rem',
		display: 'block',
		fontWeight: 'bold',
	},
	formControl: {
		marginTop: '10px',
		display: 'block',
		width: '100%',
		padding: '.375rem .75rem',
		fontSize: '1rem',
		fontWeight: 'normal',
		lineHeight: '1.5',
		color: '#212529',
		backgroundColor: '#fff',
		backgroundClip: 'paddingBox',
		border: '1px solid #ced4da',
		appearance: 'none',
		borderRadius: '.25rem',
		transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
	},
} as const;
