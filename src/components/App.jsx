import React, { Component } from "react";
import Form from "./form/form";
import { nanoid } from 'nanoid'
import Section from "./section/section";
import ContactList from "./contacts/contactsList";
import FilterContacts from "./filter/filterInput";
// all modules
import Notiflix from 'notiflix';


class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  formSubmitContactAdd = ({name,number}) => {
    const { contacts } = this.state;
    const contact = {
      name,
      number,
      id:nanoid(),
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

  render() {
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