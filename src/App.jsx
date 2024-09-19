import React from 'react';
import Dashboard from './chart';
import dashboardData from './dashboardData.json'; // Your JSON data file

function App() {
  return (
    <div className="App">
      <h1>Dynamic Dashboard</h1>
      <Dashboard data={dashboardData} />
    </div>
  );
}

export default App;
