import React from 'react'
import EntryForm from './EntryForm'

const EntryContainer = ({_u_ID, _name}) => {
  return (
    <section className='entryContainer'>
        <EntryForm _u_ID={_u_ID} _name={_name}/>
    </section>
  )
}

export default EntryContainer