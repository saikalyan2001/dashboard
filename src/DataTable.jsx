// src/DataTable.js
import React from 'react';

const DataTable = () => {
  const data = [
    { name: 'John Doe', age: 29, city: 'New York' },
    { name: 'Jane Smith', age: 35, city: 'Los Angeles' },
    { name: 'Sam Johnson', age: 25, city: 'Chicago' },
  ];

  return (
    <div className="data-table">
      <h3>User Data</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
