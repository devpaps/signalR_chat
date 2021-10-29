type Props = {
	rooms: Array<string>;
};

export default function RoomsOnline({ rooms }: Props) {
	// Check for duplicates
	const uniqueRooms = rooms.filter((item, pos, self) => {
		return self.indexOf(item) === pos;
	});

	const roomsList = (
		<div style={styles.roomsOnline}>
			<h5 style={{ color: '#666767' }}>Available rooms:</h5>
			{uniqueRooms.map((room, idx) => (
				<p key={idx}>
					- <strong>{room}</strong>
				</p>
			))}
		</div>
	);

	return <div style={styles.main}>{roomsList}</div>;
}

const styles = {
	main: {
		gridArea: '3 / 1 / 6 / 3',
		backgroundColor: '#fff',
		borderRadius: '5px',
		padding: '10px',
		width: '250px',
	},
	roomsOnline: {
		color: '#323332',
	},
} as const;
