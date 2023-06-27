import React from 'react'
import Layout from '../Components/Layouts/Layout'
import UserMenu from '../Components/Layouts/UserMenu'
import { useAuth } from '../Context/auth'
const Dashboard = () => {
    const [auth]=useAuth()
  return (
    <Layout>
       <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-2">
                <UserMenu/>
            </div>
            <div className="col-md-9">
                <div className="card w-75 p-3">
                <h3>Name:{auth?.user?.username}</h3>
                <h3>Email:{auth?.user?.email}</h3>
                <h3>Contact:{auth?.user?.mobile}</h3>
                <h3>Address:{auth?.user?.address}</h3>
                </div>
            </div>
        </div>
       </div>
    </Layout>
  )
}

export default Dashboard