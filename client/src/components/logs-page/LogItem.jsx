import React from 'react'

const LogItem = ({ log }) => {
	return (
		<>
			<td>{log.admin_id}</td>
			<td>{log.action}</td>
		</>
	)
}

export default LogItem
