// ✅ src/components/Home.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notes from "./Notes";

const Home = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ If user is not logged in, redirect to login
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
