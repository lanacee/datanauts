import { useEffect, useState } from "react";
import "./App.css";
import Button from 'react-bootstrap/Button';

// Get the cookie for the csrf token, needed for API POST requests
// https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie("csrftoken");

function App() {
  const [pestTraps, setPestTraps] = useState([]);
  const [profile, setProfile] = useState([]);
  const [uniqueId, setUniqueId] = useState("")

  useEffect(() => {
    fetch("/api/pestTrap/")
      .then((response) => response.json())
      .then((data) => {console.log(data);setPestTraps(data)});
  }, []);

  useEffect(() => {
    fetch("/api/profile/")
      .then((response) => response.json())
      .then((data) => {
        setProfile(data)
        console.log('profile',profile)
      });
  }, []);

  function addMeToTrap(e, pestTrap) {
    e.preventDefault();
    console.log("Pest trap body",pestTrap)
    fetch(`/api/pestTrap/${pestTrap.id}/`, {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body:  JSON.stringify({...pestTrap, description: "edited", users: [...pestTrap.users, profile]}),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  const _onSubmit = (event) => {
    setUniqueId(event.target.value)
  }
  console.log('uniqueId Entered: ',uniqueId)

  return (
    <div className="App">
      <p>Hello world</p>
      <form>
        <label htmlFor="uniqueId">Set Unique Id</label>
        <input onChange={(event) => setUniqueId(event.target.value)} value={uniqueId} name="uniqueId" type="text" placeholder="Enter Unique Id"/>
      </form>
      <form>
        <p>{uniqueId}</p>
        <ol>
          {pestTraps.filter((pestTrap) => pestTrap.UniqueId === uniqueId).map(pestTrap => <li key={pestTrap.id}>
            <p>Name: {pestTrap.name}</p>
            <p>Description: {pestTrap.description}</p>
            <ul>{pestTrap.users.map((user, index) => <li key={index}>{user}</li>)}</ul>
            <Button className="btn btn-primary" onClick={(event) => addMeToTrap(event, pestTrap)}>Subscribe to Pest Trap</Button>
          </li>)}
        </ol>
      </form>
    </div>
  );
}

export default App;
