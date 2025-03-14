import React from 'react'
import { Link } from 'react-router-dom'

const OwnerDashboard = () => {
  return (
    <div>
      <Link to="/owner-cashier">Add cashiers</Link>
      <br/>
      <Link to="/Owner-manager">Add managers</Link>
    </div>
  )
}

export default OwnerDashboard
