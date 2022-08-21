import { useEffect, useState } from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";

export default function Verify() {
  const [pestTraps, setPestTraps] = useState([]);
  const [css] = useStyletron();
  const [profile, setProfile] = useState([]);

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

  return (
    <div className={css({ marginTop: "40px" })}>
      <div className={css({ display: "flex", justifyContent: "center" })}>
        <ol>
          {pestTraps
            .filter((pestTrap) => {
              return pestTrap.users.some((user) => {
                return user == profile?.[0]?.id;
              });
            })
            .map((pestTrap) => (
              <li key={pestTrap.id}>
                <p>Name: {pestTrap.name}</p>
                <p>Description: {pestTrap.description}</p>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}
