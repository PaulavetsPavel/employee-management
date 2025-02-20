import React from 'react'

const LogItem = ({ log }) => {
	return (
		<>
			<td>{log.user_id}</td>
			<td>{log.action}</td>
			<td>{log.timestamp}</td>
		</>
	)
}

export default LogItem
