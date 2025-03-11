import React, { useEffect, useState } from 'react';

const Quote = () => {
  const [quote, setQuote] = useState('');
  const [url, setUrl] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await fetch('/quote');
      const data = await response.json();
      setQuote(data.quote);
      setUrl(data.url);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch when the component mounts
  }, []);

  const divStyle = {
    backgroundImage: `url(${url})`,
  };

  return (
    <div className="quote-container" onClick={fetchQuote} style={divStyle}>
      <p>{quote}</p>
    </div>
  );
};

export default Quote;
