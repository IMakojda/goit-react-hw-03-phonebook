import React, { Component } from "react";
import Form from "./form/form";
import { nanoid } from 'nanoid'
import Section from "./section/section";
import ContactList from "./contacts/contactsList";
import FilterContacts from "./filter/filterInput";
import Phonebooks from './patch/book.json'
import Notiflix from 'notiflix';


class App extends Component {
  state = {
    contacts: [],
    filter: '',
  }

  formSubmitContactAdd = ({name,number}) => {
    const { contacts } = this.state;
    const contact = {
      id:nanoid(),
      name,
      number,
    }

    if (
        contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase()) ||
        contacts.find(contact => contact.number === number)
        )
    {
      return Notiflix.Notify.failure(`${contact.name} is already in contacts`);
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
    
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts:prevState.contacts.filter(contact=> contact.id !==contactId),
    }))
  }

  onHandleFilter = e => {
    this.setState({filter:e.currentTarget.value})
  }
  componentDidMount() { 
    console.log('App component DidMont');
    const contactsLocalStorage = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contactsLocalStorage)
    
    if(parsedContacts){this.setState({ contacts: parsedContacts })}
    
    console.log(parsedContacts);
  }
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    console.log('App component DidUpdate');
    if (contacts !== prevState.contacts) {
      console.log("refresh");
      localStorage.setItem("contacts",JSON.stringify(contacts))
    }
    console.log(prevState);
    console.log(this.state);
  }
  render() {
    console.log("APP render");
    const { filter } = this.state;
    const normalizeContacts=filter.toLocaleLowerCase()
    const visibleContacts = this.state.contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizeContacts));
    return (
      <>
        <Section title="PhoneBook">
          <Form onSubmit={this.formSubmitContactAdd} />
        </Section>

        <Section title="Contacts">
          <FilterContacts
            value={filter}
            onChange={this.onHandleFilter}
          />
          <ContactList
            contactList={visibleContacts}
            onDelete={this.deleteContact}
          /> 
        </Section>
      </>
    )
  }
}

export default App;