import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { auth } from "./firebase-connection";
import Login from "./Login";
import Dashboard from "./Dashboard";
import User from "./User";
import "./Login.css";
import logo from "./image/sonoscapelogo.png";
import Count from './Count';
import Femalecount from "./Femalecount";
import Above from "./Above";
import Total from "./Total";
import { RingLoader } from 'react-spinners'; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); 
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [record, setRecord] = useState([]);

  const getData = () => {
    fetch("URL")
      .then(response => response.json())
      .then(data => {
        var arr =[]
        for(let key in data){
          let obj =data[key];
          obj.id = key;
          arr.push(obj)
        }
        setRecord(arr);
        setIsLoadingData(false); // Data fetch completed
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsLoadingData(false); // Data fetch failed
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
      setIsLoadingAuth(false);
      if (user) {
        getData();
      } else {
        setIsLoadingData(false); 
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoadingAuth || isLoadingData) {
    return <div className="loading-spinner-container">
    <RingLoader color="#007bff" loading={true} size={100} /> 
  </div>
  }

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log("User is logged out");
    });
  };

  return (
      <div className="main">
        <nav aria-label="breadcrumb">
          {isAuthenticated ? (
            <>
              <img src={logo} alt="SonoScape" className="logoimg" />
              <button className="logbtn" onClick={handleLogout}>
                Logout
              </button>
              <ol className="breadcrumb">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/user">User</Link>
                </li>
              </ol>
            </>
          ) : null}
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard item={record} auth={isAuthenticated}/>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/user"
            element={
              isAuthenticated ? (
                <User item={record} auth={isAuthenticated}/>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/dashboard/total"
            element={
              isAuthenticated ? (
                <Total item={record} auth={isAuthenticated}/>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
    
          <Route
            path="/dashboard/count"
            element={
              isAuthenticated ? (
                <Count item={record} auth={isAuthenticated}/>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          <Route
            path="/dashboard/femalecount"
            element={
              isAuthenticated ? (
                <Femalecount item={record} auth={isAuthenticated}/>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/dashboard/above"
            element={
              isAuthenticated ? (
                <Above item={record} auth={isAuthenticated}/>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />  
        </Routes>
        
      </div>
  );
};

export default App;
