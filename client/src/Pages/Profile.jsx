import React from 'react'
import Layout from '../Components/Layouts/Layout'
import UserMenu from '../Components/Layouts/UserMenu'
const Profile = () => {
  return (
    <Layout>
        <div className="container-fluid p-3 m-3">
            <div className="row">
                <div className="col-md-2">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <h1>Your Profile</h1>
                </div>
            </div>
        </div>

    </Layout>
  )
}

export default Profile