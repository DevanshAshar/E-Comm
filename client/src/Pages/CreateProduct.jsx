import React from 'react'
import Layout from '../Components/Layouts/Layout'
import AdminMenu from '../Components/Layouts/AdminMenu'
const CreateProduct = () => {
  return (
    <Layout>
        <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-2">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
            <h1>CreateProduct</h1>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateProduct