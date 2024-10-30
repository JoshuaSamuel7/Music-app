import AdminNavbar from './AdminNavbar'
import './ManageMusic.css'
import UserTable from './UserTable'
function ManageMusic() {
  return (
    <div className="music-users">
      <AdminNavbar/>
        <h1>Manage Music Users</h1>
        <div className="table">
        <UserTable className="joker"/>
        </div>
    </div>
  )
}

export default ManageMusic