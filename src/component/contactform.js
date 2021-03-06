import React, { Component } from 'react';
import ContactTable from '../component/contacttable';
import ContactCheck from '../component/contactcheck';
import { setStorageData, getStorageData } from '../storage/localstorage';
import '../design/contactform.css';

const storageKey = {
  addedContactDetails: 'addedContactDetails',
  checkedDataList: 'checkedDataList',
};

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        id: '',
        name: '',
        email: '',
        phonenumber: '',
      },
      validations: {
        name: {
          required: true,
          touched: false,
          invalid: true,
          validationMessage: 'Name is required',
        },
        email: {
          required: true,
          touched: false,
          invalid: true,
          validationMessage: 'Email is required',
        },
        phonenumber: {
          required: true,
          touched: false,
          invalid: true,
          validationMessage: 'Phone Number is required',
        },
      },
      addedContactDetails: [],
      checkedDataList: [],
    
    };
  }

  componentDidMount() {
    if (getStorageData(storageKey.addedContactDetails)) {
      const addedContactDetails = getStorageData(storageKey.addedContactDetails);
      this.setState({
        addedContactDetails,
      });
    }

    if (getStorageData(storageKey.checkedDataList)) {
      const checkedDataList = getStorageData(storageKey.checkedDataList);
      this.setState({
        checkedDataList,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      values: { name, email, phonenumber },
    } = this.state;
        this.setState(
          (prevState) => ({
            ...prevState,
            addedContactDetails: [
              ...prevState.addedContactDetails,
              { name, email, phonenumber },
            ],
            values: { name: '', email: '', phonenumber: '' },
          }),
          () =>
            setStorageData(storageKey.addedContactDetails, this.state.addedContactDetails)
        );
      
    
  };

  handleChange = (event) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          [event.target.name]: event.target.value,
        },
        validations: {
          ...prevState.validations,
          [event.target.name]: {
            ...prevState.validations[event.target.name],
            touched: true,
          },
        },
      }),
      () => {
        this.setState((prevState) => ({
          ...prevState,
          values: {
            ...prevState.values,
            [event.target.name]: event.target.value,
          },
          validations: {
            ...prevState.validations,
            [event.target.name]: {
              ...prevState.validations[event.target.name],
              invalid: this.state.values[event.target.name].length > 0 || false,
            },
          },
        }));
      }
    );
  };

  

  handleDelete = (listData) => {
    const { addedContactDetails } = this.state;
    const newListData = addedContactDetails.filter((data) => data.id !== listData.id);
    this.setState(
      (prevState) => ({
        ...prevState,
        addedContactDetails: newListData,
        checkedDataList: [...prevState.checkedDataList, listData],
      }),
      () => {
        setStorageData(storageKey.addedContactDetails, this.state.addedContactDetails);
        setStorageData(storageKey.checkedDataList, this.state.checkedDataList);
      }
    );
  };

  handleClear = () => {
    this.setState({
      values: {
        name: '',
        email: '',
        phonenumber: '',
      },
     
    });
  };

  handleRestore = (listData) => {
    const newcheckedDataList = this.state.checkedDataList.filter(
      (data) => data.id !== listData.id
    );
    this.setState(
      (prevState) => ({
        ...prevState,
        addedContactDetails: [...prevState.addedContactDetails, listData],
        checkedDataList: newcheckedDataList,
      }),
      () => {
        setStorageData(storageKey.addedContactDetails, this.state.addedContactDetails);
        setStorageData(storageKey.checkedDataList, this.state.checkedDataList);
      }
    );
  };

  render() {
    const {
      values,
      validations: { name, email, phonenumber },
      addedContactDetails,
      checkedDataList,
     
    } = this.state;

    return (
      <>
        <main className="main">
          <div>
            <h2>Contact Form Details</h2>
          </div>
          
              <form onSubmit={this.handleSubmit}>
                
                      <div className='col'>
                        <label htmlFor='name' >
                          Name:
                        </label>
                        <input
                          type='text'
                          id='name'
                          name='name'
                          className='form-control'
                          value={values.name}
                          onChange={this.handleChange}
                          onFocus={this.handleChange}
                        />
                        {name.touched && name.required && !name.invalid && (
                          <div className='validation' style={{color: "red"}}>
                            {name.validationMessage}
                          </div>
                        )}
                      </div>

                      <div className='col'>
                        <label htmlFor='email'>
                          Email:
                        </label>
                        <input
                          type='email'
                          id='email'
                          name='email'
                          className='form-control'
                          value={values.email}
                          onChange={this.handleChange}
                          onFocus={this.handleChange}
                        />
                        { email.touched && email.required && !email.invalid && (
                          <div className='validation' style={{color: "red"}}>
                            {email.validationMessage}
                          </div>
                        )}
                      </div>

                      <div className='col'>
                        <label htmlFor='phonenumber'>
                          Phone:
                        </label>
                        <input
                          type='text'
                          id='phonenumber'
                          name='phonenumber'
                          className='form-control'
                          value={values.phonenumber}
                          onChange={this.handleChange}
                          onFocus={this.handleChange}
                        />
                        {phonenumber.touched &&
                          phonenumber.required &&
                          !phonenumber.invalid && (
                            <div className='validation' style={{color: "red"}}>
                              {phonenumber.validationMessage}
                            </div>
                          )}
                      </div>
                 
                  
                  <div className='col'>
                    <div >
                     
                      {
                        <button
                          type='submit'
                          disabled={
                            !values.name || !values.phonenumber || !values.email
                          }
                        >
                          Add
                        </button>
                      }
                    </div>
                  </div>
              
              </form>
           
        </main>

        <ContactTable
          addedContactDetails={addedContactDetails}
          onHandleEdit={this.handleEdit}
          onHandleDelete={this.handleDelete}
        />

       
        <ContactCheck
          checkedDataList={checkedDataList}
          onHandleRestore={this.handleRestore}
        />
      </>
    );
  }
}

export default ContactForm;
