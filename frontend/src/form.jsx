import {useState, React} from 'react'

const TestForm = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    
    const addUser = async (event) => {
        event.preventDefault();
        const newUser = { email: email, password: password };
        try {
            const response = await fetch('/register', {
                method: 'post',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(response.status === 200){
                alert(`Added`);
            } else {
                alert(`Something went wrong = ${response.status}`);
            }
        } catch (error) {
            alert(`Error: ${response.status}`);
        }
    }

  return (
    <>
        <form onSubmit={addUser}>
            <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button type="submit" id="submit">Submit</button>
        </form>
    </>
  )
}

export default TestForm
