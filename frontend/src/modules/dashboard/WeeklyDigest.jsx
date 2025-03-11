import {React, useEffect} from 'react'
import EntryCard from './EntryCard';

const WeeklyDigest = ({id, entries, setEntries}) => {
    useEffect(() => {
        const fetchWeek = async (id, quantity) => {
            try {
              const response = await fetch(`/entry/${id}/${quantity}`)
              const data = await response.json();
              setEntries(data)
            } catch (error) {
              console.error("Error fetching entries:", error);
            }
          };
    
        // Fetch the quote as soon as the component loads
        fetchWeek(id, 7);
      }, []);
  return (
    <div className = "weekly-digest">
      {entries.map((entry) => (
        <EntryCard entry={entry}/>      
        ))}
    </div>
  )
}

export default WeeklyDigest
