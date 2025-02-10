import React from 'react'
import { Html, Button } from "@react-email/components";

const ForgotEmailTemplate = ({name, url}) => {
  return (
    <Html lang="en">
    <h2>Reset your password.</h2>
    <h3>Hello {name}!</h3>
    <p>Click the link below to reset you account password. If you did not request this, disregard this email.</p>
      <Button href={url}>Click me</Button>
    </Html>
  )
}

export default ForgotEmailTemplate
