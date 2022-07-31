import { useState } from "react";
import { headerData } from "./headerData";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";

const User = ({ users, getUsers }) => {
  console.log(users);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const filteredResult = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // if()

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `https://62e50d9020afdf238d76a473.mockapi.io/contacts/contact/${id}`
      );

      if (response.status === 200) {
        getUsers();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateUser = (item) => {
    localStorage.setItem("item", JSON.stringify(item));
  };

  console.log(localStorage.getItem("item"));

  return (
    <div className="user_wrapper">
      <div className="add_user">
        <Link to="/addUser">
          <button>Add user</button>
        </Link>
      </div>

      <div className="user_filter">
        <h2>Users</h2>
        <div className="input_field">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contact..."
          />
        </div>
      </div>
      <div className="loader">{loading && <h2>Loading...</h2>}</div>
      <div className="table_wrapper">
        <table>
          <thead>
            <tr className="table_header_row">
              {headerData.map((item) => {
                return <th key={item.id}>{item.title}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {filteredResult.length !== 0 ? (
              filteredResult.map((item) => {
                const { id, name, username, email, phone } = item;
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>
                      <button
                        className="action_btn delete_btn"
                        onClick={() => deleteUser(id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <Link to="/edit">
                        <button
                          className="action_btn edit_btn"
                          onClick={() => updateUser(item)}
                        >
                          Edit user
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="user_not_found">
                <td>No user found!!!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
