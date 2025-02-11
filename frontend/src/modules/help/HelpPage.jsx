import React from 'react'

const HelpPage = () => {
  return (
    <div className='page-container'>
      <h2 className='page-title'>Help</h2>
      <p className='p-info'>BrainLog is a web application designed to help you monitor your daily mental well-being. By logging your experiences and emotions, you can gain valuable insights into your progress over time.</p> 
      <p className='p-info'>To create an entry, simply fill out the  questionnaire and submit it. This allows the opportunity to reflect on your day and capture important aspects of your mental health.</p>
      <p className='p-info'>Please note that you are limited to one entry per 24 hours. This restriction encourages you to take a thoughtful approach to your mental well-being logging, allowing you to focus on meaningful changes and improvements.</p>
      <p className='p-info'>For more information about each field in the questionnaire, feel free to click on the prompt. This will display a helpful tip to guide you in understanding how to best answer the question, click again to dismiss it.</p>
    </div>
  )
}

export default HelpPage
