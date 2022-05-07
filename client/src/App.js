import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  Navbar  from './Navigation/NavBar';
import { Home } from './pages/Home';
import Login from './pages/users/login';
import Register from './pages/users/register';
import { AddAward } from './pages/awards/AddAward';
import { AddCategory } from "./pages/Categories/AddCategory"
import { AllCategories } from "./pages/Categories/AllCategories"
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { Contestants } from "./pages/contestants/Contestants"
import { AllWards } from './pages/awards/AllWards';
import { Layout1 } from './Navigation/Layout1';
import { AllAwardsPublic } from './pages/awards/AllAwardsPublic';
import { About } from './pages/About';
import Recover from './pages/users/Recover';
import { Profile } from './pages/users/profile';
import UpdateProfile from './pages/users/UpdateProfile';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/awards" element={<AllAwardsPublic />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/about" element={<Recover />} />


          <Route exact path="/add-award" element={
            <Layout1>
              <AddAward />
            </Layout1>} />
            <Route exact path="/add-award" element={
            <Layout1>
              <AddAward />
            </Layout1>} />
          <Route exact path="/profile" element={
            <Layout1>
              <Profile />
            </Layout1>} />
            <Route exact path="/updateProfile" element={
            <Layout1>
              <UpdateProfile />
            </Layout1>} />
          <Route exact path="/dashboard" element={
            <Layout1>
              <Dashboard />
            </Layout1>
          } />
          <Route exact path="/all-awards" element={<Layout1>
            <AllWards />
          </Layout1>} />
          <Route exact path="/add-category" element={<Layout1>
            <AddCategory />
          </Layout1>} />
          <Route exact path="/categories" element={<Layout1>
            <AllCategories />
          </Layout1>} />
          <Route exact path="/contestants" element={<Layout1>
            <Contestants />
          </Layout1>} />
        </Routes>



      </BrowserRouter>
    </div>
  );
}

export default App;
