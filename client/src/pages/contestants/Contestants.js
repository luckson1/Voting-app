import React from 'react';
export const Contestants = () => {
    return(
        <div className="container mt-3">
  <h2 className="text-center">Contestants</h2>
  <p className="text-center">These are the contestants to your events</p>            
  <table className="table">
    <thead>
      <tr>
        <th>Contestant</th>
        <th>Award</th>
        <th>Category</th>
        <th>Company</th>
        <th>Creation Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
        <td>john@example.com</td>
        <td>john@example.com</td>
        <td>john@example.com</td>
      </tr>
      
    </tbody>
  </table>
  </div>
    );
};
