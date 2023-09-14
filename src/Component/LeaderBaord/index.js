import React from 'react'
import { useSelector } from 'react-redux';
import { getuserId } from '../../redux/connection';
import "./index.css"

const LeaderboardTable = () => {
    const state=useSelector(state=>state)
  const users = getuserId(state);

  return (
    <table className="user-table">
        <thead>
          <tr>
            <th>name</th>
            <th>WPM</th>
            <th>progress</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            Array.isArray(users) &&
            users.map((user) => (
              <tr key={user.userName}>
                <td>{user.userName}</td>
                <td>{user.currentWPM}</td>
                <td>
                  {" "}
                  <progress id={user.id} max="100" value={user.progress}>
                    {user.progress}
                  </progress>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
  )
}

export default LeaderboardTable