import { useEffect, useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Frontpage from "./pages/frontpage";
import Navbar from "./pages/navbar";
import Edit from "./pages/edit";
import List from "./pages/list";
import Review from "./pages/review";
import Verify from "./pages/verify";

// Get the cookie for the csrf token, needed for API POST requests
// https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
// function getCookie(name) {
//   let cookieValue = null;
//   if (document.cookie && document.cookie !== "") {
//     const cookies = document.cookie.split(";");
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       // Does this cookie string begin with the name we want?
//       if (cookie.substring(0, name.length + 1) === name + "=") {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }
// const csrftoken = getCookie("csrftoken");

function App() {
  // const [pestTraps, setPestTraps] = useState([]);
  // const [profile, setProfile] = useState([]);
  // const [uniqueId, setUniqueId] = useState("");
  // const [subscribed, setSubscribed] = useState(false);

  // useEffect(() => {
  //   fetch("/api/pestTrap/")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setPestTraps(data);
  //     });
  //   fetch("/api/profile/")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProfile(data);
  //       console.log(data[0].id);
  //     });
  // }, []);

  // // useEffect(() => {
  // //   fetch("/api/profile/")
  // //     .then((response) => response.text())
  // //     .then((data) => {
  // //       setProfile(data);
  // //       console.log(data.data);
  // //     });
  // // }, []);

  // function addMeToTrap(e, pestTrap) {
  //   e.preventDefault();
  //   console.log("Pest trap body", pestTrap);
  //   fetch(`/api/pestTrap/${pestTrap.id}/`, {
  //     method: "put",
  //     headers: {
  //       Accept: "application/json, text/plain, */*",
  //       "Content-Type": "application/json",
  //       "X-CSRFToken": csrftoken,
  //     },
  //     body: JSON.stringify({
  //       ...pestTrap,
  //       users: [...pestTrap.users, profile[0].id],
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setSubscribed(true);
  //     });
  // }

  // const _onSubmit = (event) => {
  //   setUniqueId(event.target.value);
  // };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route index element={<Frontpage />} />
        <Route path="create" element={<Verify />} />
        {/* <Route path="edit" element={<Edit />} />
        <Route path="list" element={<List />} /> */}
        <Route path="review" element={<Review />} />
      </Routes>
    </Router>
  );

//   return (
//     <div className="App">
//       <h1>Find Your Fly Trap</h1>
//       <form>
//         <label htmlFor="uniqueId">Type in the Unique Id Posted to you:</label>
//         <input
//           onChange={(event) => setUniqueId(event.target.value)}
//           value={uniqueId}
//           name="uniqueId"
//           type="text"
//           placeholder="Enter Unique Id"
//         />
//       </form>
//       <h2>Subscribed Traps</h2>
//       <ol>
//         {pestTraps
//           .filter((pestTrap) => {
//             console.log("pest trap profile", profile[0].id);
//             return pestTrap.users.some((user) => {
//               console.log("user id", user);
//               console.log("profile id", profile[0].id);
//               return user == profile[0].id;
//             });
//           })
//           .map((pestTrap) => (
//             <li key={pestTrap.id}>
//               <p>Name: {pestTrap.name}</p>
//               <p>Description: {pestTrap.description}</p>
//               {subscribed && (
//                 <div>
//                   <b>Success! You are now subscribed</b>
//                 </div>
//               )}
//             </li>
//           ))}
//       </ol>
//       <form>
//         <ol>
//           {pestTraps
//             .filter((pestTrap) => pestTrap.UniqueId === uniqueId)
//             .map((pestTrap) => (
//               <li key={pestTrap.id}>
//                 <p>Name: {pestTrap.name}</p>
//                 <p>Description: {pestTrap.description}</p>
//                 {/* <ul>{pestTrap.users.map((user, index) => <li key={index}>{user}</li>)}</ul> */}
//                 {!subscribed ? (
//                   <>
//                     <Button
//                       className="btn btn-primary"
//                       onClick={(event) => addMeToTrap(event, pestTrap)}
//                     >
//                       Subscribe to Pest Trap
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <h2>There are no reported events at this Fruit Trap</h2>
//                     <img
//                       src="https://www.moira.vic.gov.au/files/content/public/business/queensland-fruit-fly-project/qff-logo-update-red.png?dimension=pageimage&w=480"
//                       alt=""
//                       srcset=""
//                     />
//                   </>
//                 )}
//                 {subscribed && (
//                   <div>
//                     <b>Success! You are now subscribed</b>
//                   </div>
//                 )}
//               </li>
//             ))}
//         </ol>
//       </form>
//     </div>
//   );
}

export default App;
