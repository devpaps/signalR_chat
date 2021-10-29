import React from 'react';

type Props = {
	rooms: Array<string>;
};

export default function ShowOnlineRooms({ rooms }: Props) {
	// Check for duplicates
	const uniqueRooms = rooms.filter((item, pos, self) => {
		return self.indexOf(item) === pos;
	});

	const roomsList =
		rooms.length < 1 ? (
			<div style={styles.roomsOnline}>
				<h4 style={{ color: '#666767' }}>No rooms available</h4>
			</div>
		) : (
			<div style={styles.roomsOnline}>
				<h4 style={{ color: '#666767' }}>Available rooms:</h4>
				{uniqueRooms.map((room, idx) => (
					<div key={idx}>
						-<strong>{room}</strong>
					</div>
				))}
			</div>
		);

	return <div style={styles.main}>{roomsList}</div>;
}

const styles = {
	main: {
		margin: '0 auto',
		backgroundColor: '#fff',
		borderRadius: '5px',
		padding: '10px',
		width: '250px',
	},
	roomsOnline: {
		color: '#323332',
	},
} as const;
