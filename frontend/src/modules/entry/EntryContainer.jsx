import React from 'react'
import EntryForm from './EntryForm'

const EntryContainer = ({_u_ID, _name}) => {
  return (
    <section className='page-container'>
        <EntryForm _u_ID={_u_ID} _name={_name}/>
    </section>
  )
}

export default EntryContainer