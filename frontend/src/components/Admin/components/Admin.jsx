import AdminNavbar from "./AdminNavbar"
import Optioncard from "./Card"
import './Admin.css'
function Admin() {
    const options=[{p:"Create Admin",action:"/admin/create-users"},{ p:"Delete Admin", action:"/admin/delete-users"},{ p:"Manage Music Users", action:"/admin/manage-music-users"},{ p:"Analytics", action:"/admin/analytics"}]
    return (
        <div className="admin">
                <AdminNavbar />
            <div className="cards">
                {options.map((v,i)=><Optioncard p={v.p} action={v.action} key={i} />)}
            </div>
        </div>
    )
}
export default Admin