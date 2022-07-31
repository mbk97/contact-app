import "./App.css";
import AddUser from "./components/addUser/AddUser";
import User from "./components/user/User";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Edit from "./components/editUser/Edit";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://62e50d9020afdf238d76a473.mockapi.io/contacts/contact"
      );
      console.log(response.data);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="">
      <div className="title_container">
        <h1>Contact Application</h1>
      </div>

      <div className="component">
        <div className="component_wrapper">
          <Routes>
            <Route
              path="/"
              exact
              element={
                <User
                  users={users}
                  setLoading={setLoading}
                  loading={loading}
                  getUsers={getUsers}
                />
              }
            />
            <Route
              path="/addUser"
              element={
                <AddUser
                  setUsers={setUsers}
                  setLoading={setLoading}
                  loading={loading}
                />
              }
            />
            <Route path="/edit" element={<Edit getUsers={getUsers} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
