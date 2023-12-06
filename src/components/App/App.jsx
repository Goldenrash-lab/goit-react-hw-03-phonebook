import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactsList from '../ContactsList/ContactsList';
import SearchContact from '../SearchContact/SearchContact';
import { AppWrapper, PhoneBook } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    this.setState({ contacts: this.loadToLS('CONTACTS') });
  }
  // componentDidUpdate(prevProps, prevState)

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      this.saveToLS('CONTACTS', this.state.contacts);
    }
  }

  // LOCALSTORAGE

  saveToLS(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error.message);
    }
  }

  loadToLS(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
      console.log(error.message);
      return localStorage.getItem(key);
    }
  }

  handlerAddContact = (name, number) => {
    const result = this.state.contacts.some(el => el.name === name);
    if (result) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        {
          id: crypto.randomUUID(),
          name,
          number,
        },
      ],
    }));
  };

  handlerSearch = e => {
    this.setState({ filter: e.target.value });
  };

  filterContacts = () => {
    return this.state.contacts.filter(el =>
      el.name.includes(this.state.filter)
    );
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };
  render() {
    return (
      <AppWrapper>
        <PhoneBook>
          <h3>Phonebook</h3>
          <ContactForm onContactAdd={this.handlerAddContact} />
          <h3>Contacts</h3>
          <SearchContact
            value={this.state.filter}
            onSearch={this.handlerSearch}
          />
          <ContactsList
            onDelete={this.handleDelete}
            contacts={this.filterContacts()}
          />
        </PhoneBook>
      </AppWrapper>
    );
  }
}
