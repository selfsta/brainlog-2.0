import React from 'react'
import Quote from '../quotes/Quote'
import WeeklyDigest from './WeeklyDigest'

const DashboardPage = ({_u_ID}) => {
  return (
    <div className='page-container'>
      <h2 className='page-title'>Dashboard</h2>
      <Quote/>
    <WeeklyDigest id={_u_ID}/>
    </div>
  )
}

export default DashboardPage
