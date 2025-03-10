import React, { useEffect, useState } from 'react';

const Quote = () => {
  const [quote, setQuote] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
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

    // Fetch the quote as soon as the component loads
    fetchQuote();
  }, []);

  const divStyle = {
    width: '200px',
    height: '200px',
    border: 'solid 5px black',
    borderRadius: '10px',
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textShadow: '1px 1px 2px #000'
  };

  return (
    <div style={divStyle}>
      <p>{quote}</p>
    </div>
  );
};

export default Quote;
