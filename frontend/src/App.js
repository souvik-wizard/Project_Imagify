import { useRef } from "react";

function App() {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    
    try{
      const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    console.log(json);
    } catch(err){
      console.log(err);
    }
  }
  return (
    <div className="App" >
      Hello World!
      <form onSubmit={handleSubmit} ref={formRef}>
        <input type="text" name="firstname" placeholder="First Name"/>
        <input type="text" name="lastname" placeholder="Last Name"/>
        <input type="text" name="email" placeholder="Email"/>
        <input type="text" name="password" placeholder="Password"/>
        <input type="submit" value="Sign Up"/>
      </form>
    </div>
  );
}

export default App;
