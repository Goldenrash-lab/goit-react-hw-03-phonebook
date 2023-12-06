import React, { Component } from 'react';
import { Input, Button } from './ContactForm.styled';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handlerChangeName = e => {
    this.setState({ name: e.target.value });
  };
  handlerChangePhone = e => {
    this.setState({ number: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onContactAdd(this.state.name, this.state.number);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          onChange={this.handlerChangeName}
          type="text"
          name="name"
          value={this.state.name}
          required
        />
        <label htmlFor="phone">Phone</label>
        <Input
          id="phone"
          onChange={this.handlerChangePhone}
          type="tel"
          name="number"
          value={this.state.number}
          required
        />
        <Button type="submit">Add contact</Button>
      </form>
    );
  }
}
