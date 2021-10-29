import { useEffect, useRef } from 'react';
import SendMessageForm from './SendMessageForm';

type Props = {
	sendMessage: (messages: string) => void;
	messages: Array<{
		user: string;
		message: string;
		date: string;
	}>;
};

export default function MessageContainer({ messages, sendMessage }: Props) {
	const messageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messageRef && messageRef.current) {
			const { scrollHeight, clientHeight } = messageRef.current;
			messageRef.current.scrollTo({
				left: 0,
				top: scrollHeight - clientHeight,
				behavior: 'smooth',
			});
		}
	}, [messages]);

	return (
		<>
			<div ref={messageRef} style={styles.messageContainer}>
				{messages.map((m, index) => (
					<div key={index} style={styles.userMessage}>
						<div style={styles.message}>{m.message}</div>
						<div className='from-user'>
							{m.user} - {m.date}
						</div>
					</div>
				))}
			</div>
			<SendMessageForm sendMessage={sendMessage} />
		</>
	);
}

const styles = {
	messageContainer: {
		gridArea: '1 / 3 / 5 / 11',
		height: '400px',
		backgroundColor: '#fff',
		overflow: 'auto',
		borderRadius: '5px',
		marginBottom: '2px',
	},
	userMessage: {
		margin: '1rem 0',
		textAlign: 'right',
		paddingRight: '5px',
		fontSize: '18px',
	},
	message: {
		backgroundColor: '#4F436D',
		display: 'inline-flex',
		marginRight: '15px',
		padding: '7px 22px',
		fontSize: '18px',
		color: '#f1f1f1',
		borderRadius: '20px 20px 0px 20px',
		marginTop: '3px',
		boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
	},
} as const;
