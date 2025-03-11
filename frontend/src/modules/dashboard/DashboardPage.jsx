import { React, useState } from 'react'
import Quote from '../quotes/Quote'
import WeeklyDigest from './WeeklyDigest'
import Chart from './Chart'

const DashboardPage = ({_u_ID}) => {
  const [entries, setEntries] = useState([]);
  return (
    <div className='page-container'>
      <h2 className='page-title'>Dashboard</h2>
      <h3 className='sub-title'>Your daily quote:</h3>
      <Quote/>
      <Chart entries={entries}/>
      <WeeklyDigest id={_u_ID} entries={entries} setEntries={setEntries}/>
    </div>
  )
}

export default DashboardPage
