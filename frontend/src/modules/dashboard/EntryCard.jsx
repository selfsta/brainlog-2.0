import { React, useState } from 'react'

const keyDict = {
    'joy': 'J',
    'love': 'L',
    'fear': 'F',
    'sadness': 'S',
    'surprise': 'U',
    'anger': 'A'
  }
  
  const EntryCard = ({entry}) => {
      const [analysis, setAnalysis] = useState('')
      const analyzeEmotions = async (emotions) => {   
        const keyStr = emotions
        .map((emotion) => keyDict[emotion.toLowerCase()] || "").sort().join("");
        
          try {
            const response = await fetch(`/analysis/${keyStr}`)
            const data = await response.json();
            setAnalysis(data)
          } catch (error) {
            console.error("Error fetching entries:", error);
          }
        };
  return (
    <div key={entry.date} className="entry-card">
          <p><span className="bolder-text">Date: </span>{new Date(entry.createdAt).toLocaleDateString("en-US")}</p>
          <p><span className="bolder-text">Wellbeing: </span>{entry.wellbeing}%</p>
          <p><span className="bolder-text">Sleep Quality: </span>{entry.sleep}%</p>
          <p><span className="bolder-text">Emotions: </span>{entry.emotions.map((emotion) => emotion.charAt(0).toUpperCase() + emotion.slice(1)).join(", ")}</p> 
          {analysis != '' ? <p><span className="bolder-text">Analysis Result: </span>{analysis}</p> : <button className="submit"onClick={() => analyzeEmotions(entry.emotions)}>Analyze Emotions</button>}
          <p><span className="bolder-text">Comments: </span>{entry.journal || "No comments"}</p>
        </div>
  )
}

export default EntryCard
