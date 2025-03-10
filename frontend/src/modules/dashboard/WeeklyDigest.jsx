import {React, useState, useEffect} from 'react'


const WeeklyDigest = ({id}) => {
    const [entries, setEntries] = useState([]);
    useEffect(() => {
        const fetchWeek = async (id, quantity) => {
            try {
              const response = await fetch(`/entry/${id}/${quantity}`)
              const data = await response.json();
              console.log(typeof data)
              console.log(data)
              setEntries(data)
            } catch (error) {
              console.error("Error fetching entries:", error);
            }
          };
    
        // Fetch the quote as soon as the component loads
        fetchWeek(id, 7);
      }, []);
  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.date}>
          <p>Date: {new Date(entry.date).toLocaleDateString("en-US")}</p>
          <p>Wellbeing: {entry.wellbeing}%</p>
          <p>Sleep Quality: {entry.sleep}%</p>
          <p>Emotions: {entry.emotions.join(", ")}</p>
          <p>Comments: {entry.journal || "No comments"}</p>
        </div>
      ))}
    </div>
  )
}

export default WeeklyDigest
