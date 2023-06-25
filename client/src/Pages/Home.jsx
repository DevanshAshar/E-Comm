import React from 'react'
import Layout from '../Components/Layouts/Layout'
import {useAuth} from '../Context/auth'
const Home = () => {
  const [auth,setAuth]=useAuth()
  return (
    <Layout>
        <h1>Home</h1>
    </Layout>
  )
}

export default Home