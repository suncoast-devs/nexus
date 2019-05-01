import React, { Component } from 'react'

const Home = ({ isAuthenticated }) => (
  <>
    {!isAuthenticated && (
      <div>
        <h4>You are not logged in!</h4>
      </div>
    )}
  </>
)

export default Home
