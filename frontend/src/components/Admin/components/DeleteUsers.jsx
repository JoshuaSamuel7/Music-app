import { useEffect, useState } from 'react'
import DeleteAccordian from './DeleteAccordian'
import './Delete.css'
import axios from 'axios'
import { useContext } from 'react'
import { contentProvider } from './ContextProvider'
import AdminNavbar from './AdminNavbar'
function DeleteUsers() {
  const { baseURL } = useContext(contentProvider);
  const [allUsers, setAllUsers] = useState([])
  useEffect(() => {
    axios.get(baseURL +"/api/admin/get-admin", { withCredentials: true })
      .then(response => {
        setAllUsers(response.data.users)
      })
      .catch(err => {
        console.log(err);
      })
  }, [allUsers])
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <div className="delete-users">
        <h1>Delete Users</h1>
        <div className="accordians">
          {allUsers.map((v, i) => <DeleteAccordian username={v.username} name={v.name} key={i} />)}
        </div>
      </div>
    </>

  )
}

export default DeleteUsers