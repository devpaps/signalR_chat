import { useState, useEffect } from 'react';
import {
	HubConnection,
	HubConnectionBuilder,
	LogLevel,
} from '@microsoft/signalr';
import Lobby from './Components/Lobby';
import Chat from './Chat';
import ShowOnlineRooms from './Components/ShowOnlineRooms';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
	sendMessage: () => void;
	messages: Array<{
		user: string;
		message: string;
		date: string;
	}>;
	users: Array<string>;
	rooms: Array<string>;
	currentUsers: Array<{
		user: string;
	}>;
	currentRoom: Array<{
		room: string;
	}>;
	closeConnection: () => void;
};

export default function App() {
	const [connection, setConnection] = useState<HubConnection | null>();
	const [messages, setMessages] = useState<Props['messages'] | []>([]);
	const [users, setUsers] = useState<Props['users']>([]);
	const [rooms, setRooms] = useState<Props['rooms']>([]);
	const [currentUsers, setCurrentUsers] = useState<Props['currentUsers'] | []>(
		[]
	);
	const [currentRoom, setCurrentRoom] = useState<Props['currentRoom'] | []>([]);
	const [isLoggedIn, setLogin] = useState<Boolean>(false);

	useEffect(() => {
		async function start() {
			const connection = await new HubConnectionBuilder()
				.withUrl('https://localhost:5001/chat')
				.configureLogging(LogLevel.Information)
				.withAutomaticReconnect()
				.build();

			// Get the rooms that are currently online, and shows them in the lobby
			try {
				connection?.on('GetAvailableRooms', (rooms: Array<string>) => {
					setRooms(rooms);
				});
			} catch (error) {
				console.error(error);
			}

			await connection.start();
			setConnection(connection);
		}
		start();
	}, []);

	// Runs this function when the user is "logged" in,
	// in other words when the user clicks the "Log in" button
	const joinRoom = async (user: string, room: string) => {
		// Store the user in the currentUsers array to welcome the user
		setCurrentUsers((currentUsers) => {
			return [...currentUsers, { user }];
		});

		setCurrentRoom((currentRoom) => {
			return [...currentRoom, { room }];
		});

		try {
			connection?.on(
				'ReceiveMessage',
				(user: string, message: string, date: string) => {
					setMessages((messages) => {
						return [...messages, { user, message, date }];
					});
				}
			);

			connection?.on('UsersInRoom', (users: Array<string>) => {
				setUsers(users);
			});

			connection?.on('Rooms', (rooms: Array<string>) => {
				setRooms(rooms);
				//setCurrentUser(currentUser);
				/* setCurrentUsers((currentUsers) => {
					return [...currentUsers, { user }];
				}); */
			});

			/* connection?.on('CreatedByUser', (currentUser: Array<string>) => {
				setCurrentUser(currentUser);
			}); */

			connection?.onclose((e) => {
				setConnection(null);
				setMessages([]);
				setUsers([]);
			});
			// Push function to server
			await connection?.invoke('JoinRoom', { user, room });
			setLogin(true);
		} catch (e) {
			console.error(e);
		}
	};

	const sendMessage = async (message: string) => {
		try {
			await connection?.invoke('SendMessage', message);
		} catch (e) {
			console.error(e);
		}
	};

	// Reload app when connection is closed
	const closeConnection = async () => {
		try {
			await connection?.stop();
			window.location.reload();
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			{!isLoggedIn ? (
				<div style={styles.app}>
					<h1>Chelsea kommunikation</h1>
					<br />
					<Lobby joinRoom={joinRoom} />
					<ShowOnlineRooms rooms={rooms} />
				</div>
			) : (
				<div style={styles.chat}>
					<Chat
						currentUser={currentUsers}
						currentRoom={currentRoom}
						rooms={rooms}
						sendMessage={sendMessage}
						messages={messages}
						users={users}
						closeConnection={closeConnection}
					/>
				</div>
			)}
		</div>
	);
}

const styles = {
	app: {
		margin: '5rem auto',
		textAlign: 'center',
		paddingTop: '40px',
		width: '100%',
		maxWidth: '1250px',
		fontFamily: 'Ubuntu, sans-serif',
	},
	chat: {
		margin: '5rem auto',
		width: '1250px',
		padding: '0 3rem',
	},
} as const;
