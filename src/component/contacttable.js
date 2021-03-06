import React from 'react';
import '../design/contacttable.css';

const ContactTable = (props) => {
  const { addedContactDetails, onHandleDelete } = props;
  return (
    <div className="table">
      <div className='mt-4'>
      <h2>Added ContactForm List</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th className='col'>S.N</th>
            <th className='col'>Name</th>
            <th className='col'>Email</th>
            <th className='col'>Phone Number</th>
            <th className='col'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {addedContactDetails.length ? (
            addedContactDetails.map((data, index) => (
              <tr key={index}>
                <th className='row'>{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phonenumber}</td>
                <td>
                  <span
                    style={{ cursor: 'pointer' }}
                    title='Delete'
                    onClick={() => onHandleDelete(data)}
                  >
                   <input type="checkbox"/>
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5' className='text-center'>
                No data to display
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ContactTable;
