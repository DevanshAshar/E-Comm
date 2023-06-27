import React from 'react'
import Layout from '../Components/Layouts/Layout'
import AdminMenu from '../Components/Layouts/AdminMenu'

const AllUsers = () => {
  return (
    <Layout>
        <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-2">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
            <h1>AllUsers</h1>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default AllUsers