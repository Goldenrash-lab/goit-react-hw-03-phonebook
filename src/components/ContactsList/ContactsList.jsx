import React, { Component } from 'react';
import { DeleteBtn, ContactItem } from './ContactsList.styled';

export default class ContactsList extends Component {
  render() {
    return (
      <ul>
        {this.props.contacts.map(el => (
          <ContactItem key={crypto.randomUUID()}>
            <h4>
              {el.name}: {el.number}
            </h4>
            <DeleteBtn onClick={() => this.props.onDelete(el.id)} type="button">
              DELETE
            </DeleteBtn>
          </ContactItem>
        ))}
      </ul>
    );
  }
}
