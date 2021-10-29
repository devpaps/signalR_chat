import userImage from '../assets/images/user.svg';

type Props = {
	users: Array<string>;
};

export default function UsersOnline({ users }: Props) {
	return (
		<div style={styles.main}>
			<h5 style={{ color: '#666767' }}>Users in channel</h5>
			{users.map((user, idx) => (
				<div key={idx} style={styles.avatarContainer}>
					<img style={styles.userAvatar} src={userImage} alt='user' />
					<span style={styles.online}></span>
					<span>
						<strong>{user}</strong>
					</span>
				</div>
			))}
		</div>
	);
}

const styles = {
	main: {
		gridArea: '1 / 1 / 3 / 3',
		backgroundColor: '#fff',
		borderRadius: '5px',
		padding: '10px',
		width: '250px',
	},
	avatarContainer: {
		marginBottom: '0.5em',
	},
	userAvatar: {
		height: '30px',
		width: '30px',
		margin: '5px 0px 5px 0',
	},
	online: {
		background: 'green',
		position: 'relative',
		height: '10px',
		width: '10px',
		display: 'inline-block',
		borderRadius: '50%',
		top: '10px',
		right: '7px',
	},
} as const;
