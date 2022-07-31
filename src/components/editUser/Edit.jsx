import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = ({ getUsers }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [ID, setID] = useState();

  const { username, name, phone, email, id } = JSON.parse(
    localStorage.getItem("item")
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  useEffect(() => {
    setUserData({
      username: username,
      name: name,
      phone: phone,
      email: email,
    });
    setID(id);
  }, [email, id, phone, name, username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `https://62e50d9020afdf238d76a473.mockapi.io/contacts/contact/${ID}`,
        userData
      );
      if (response.status === 200) {
        getUsers();
        toast.success("User updated Successfully!");
        navigate("/");
      }
      setLoading(false);
      console.log(response);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="add_user_container">
      <header>
        <h2>Edit Contact</h2>
        <button className="link_btn">
          <Link to="/" className="link_btn_link">
            Users
          </Link>
        </button>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="form_control">
          <input
            type="text"
            name="name"
            value={userData.name}
            placeholder="Enter fullName"
            onChange={handleChange}
          />
        </div>
        <div className="form_control">
          <input
            type="text"
            name="username"
            value={userData.username}
            placeholder="Enter username"
            onChange={handleChange}
          />
        </div>
        <div className="form_control">
          <input
            type="email"
            name="email"
            value={userData.email}
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="form_control">
          <input
            type="number"
            name="phone"
            value={userData.phone}
            placeholder="Enter phoneNumber"
            onChange={handleChange}
          />
        </div>
        <div className="form_control">
          <button className="submit_btn">
            {loading ? "Editing..." : "Edit User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
