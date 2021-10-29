import MessageContainer from './Components/MessageContainer';
import ConnectedUsers from './Components/UsersOnline';
import RoomsOnline from './Components/RoomsOnline';
import { Button } from 'react-bootstrap';

type Props = {
	sendMessage: (messages: string) => void;
	messages: Array<{
		user: string;
		message: string;
		date: string;
	}>;
	users: Array<string>;
	rooms: Array<string>;
	currentUser: Array<{
		user: string;
	}>;
	currentRoom: Array<{
		room: string;
	}>;
	closeConnection: () => void;
};

export default function Chat({
	sendMessage,
	currentUser,
	currentRoom,
	messages,
	users,
	closeConnection,
	rooms,
}: Props) {
	const userOnline = currentUser[currentUser.length - 1];
	const thisRoom = currentRoom[currentRoom.length - 1];

	return (
		<>
			<h1>Chelsea Kommunikation</h1>
			<p>Welcome {userOnline.user}</p>
			<p>Current room: {thisRoom.room}</p>
			<div style={styles.leaveButton}>
				<Button variant='danger' onClick={() => closeConnection()}>
					Leave Room
				</Button>
			</div>
			<div style={styles.chat}>
				<ConnectedUsers users={users} />
				<RoomsOnline rooms={rooms} />
				<MessageContainer messages={messages} sendMessage={sendMessage} />
			</div>
		</>
	);
}

const styles = {
	chat: {
		marginTop: '2rem',
		display: 'grid',
		gridTemplateColumns: 'repeat(10, 1fr)',
		gridTemplateRows: 'repeat(5, 1fr)',
		gap: '1.5rem',
		fontFamily: 'Ubuntu, sans-serif',
	},
	messageInput: {
		marginTop: '10px',
		width: '79%',
	},
	leaveButton: {
		marginTop: '2rem',
		textAlign: 'right',
	},
} as const;
