import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddUser = ({ setUsers }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const { username, name, phone, email } = userData;

  const disable = !username | !name | !phone | !email;

  const addPost = {
    id: Math.floor(Math.random() * 10000) + 1,
    ...userData,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://62e50d9020afdf238d76a473.mockapi.io/contacts/contact",
        addPost
      );
      setUsers((prev) => [...prev, response.data]);
      toast.success("Contact added successfully");
      setLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="add_user_container">
      <header>
        <h2>Add Contact</h2>
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
            value={name}
            placeholder="Enter fullName"
            onChange={handleChange}
          />
        </div>
        <div className="form_control">
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter username"
            onChange={handleChange}
          />
        </div>
        <div className="form_control">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="form_control">
          <input
            type="number"
            name="phone"
            value={phone}
            placeholder="Enter phoneNumber"
            onChange={handleChange}
          />
        </div>
        <div className="form_control">
          <button
            disabled={disable}
            className={disable ? "submit_btn disabled" : "submit_btn"}
          >
            {loading ? "Adding contact..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
