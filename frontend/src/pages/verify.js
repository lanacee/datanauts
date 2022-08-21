import { useEffect, useState } from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";

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
export default function Verify() {
  const [pestTraps, setPestTraps] = useState([]);
  const [css] = useStyletron();
  const [uniqueId, setUniqueId] = useState("");
  const [profile, setProfile] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetch("/api/pestTrap/")
      .then((response) => response.json())
      .then((data) => {
        setPestTraps(data);
      });
    fetch("/api/profile/")
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      });
  }, []);

  function addMeToTrap(e, pestTrap) {
    e.preventDefault();
    fetch(`/api/pestTrap/${pestTrap.id}/`, {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        ...pestTrap,
        users: [...pestTrap.users, profile[0].id],
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setSubscribed(true);
      });
  }

  return (
    <div className={css({ marginTop: "40px" })}>
      <div className={css({ display: "flex", justifyContent: "center" })}>
        <div className={css({ width: "50%" })}>
          <form>
            <FormControl label="Unique ID">
              <Input
                onChange={(event) => setUniqueId(event.target.value)}
                value={uniqueId}
                name="uniqueId"
                type="text"
                placeholder="Enter Unique Id"
              />
            </FormControl>
          </form>
        </div>
      </div>
      <div className={css({ display: "flex", justifyContent: "center" })}>
        <ol>
          {pestTraps
            .filter((pestTrap) => pestTrap.UniqueId === uniqueId)
            .map((pestTrap) => (
              <li key={pestTrap.id}>
                <p>Name: {pestTrap.name}</p>
                <p>Description: {pestTrap.description}</p>
                {/* <ul>{pestTrap.users.map((user, index) => <li key={index}>{user}</li>)}</ul> */}
                {!subscribed ? (
                  <>
                    <Button
                      className="btn btn-primary"
                      onClick={(event) => addMeToTrap(event, pestTrap)}
                    >
                      Subscribe to Pest Trap
                    </Button>
                  </>
                ) : (
                  <>
                    <h2>There are no reported events at this Fruit Trap</h2>
                    <img
                      src="https://www.moira.vic.gov.au/files/content/public/business/queensland-fruit-fly-project/qff-logo-update-red.png?dimension=pageimage&w=480"
                      alt=""
                      srcset=""
                    />
                  </>
                )}
                {subscribed && (
                  <div>
                    <b>Success! You are now subscribed</b>
                  </div>
                )}
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}
