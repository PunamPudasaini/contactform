import React from 'react';
import '../design/contacttable.css';

const ContactCheck = (props) => {
  const { checkedDataList, onHandleRestore } = props;
  return (
    <div >
      <h2>Checked ContactForm List</h2>
      <table className='table '>
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
          {checkedDataList.length ? (
            checkedDataList.map((data, index) => (
              <tr key={index}>
                <th className='row'>{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phonenumber}</td>
                <td>
                  <span
                    style={{ marginRight: '15px', cursor: 'pointer' }}
                    title='Restore'
                    onClick={() => onHandleRestore(data)}
                  >
                   <input type="checkbox" checked />
                    
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
  );
};

export default ContactCheck;
