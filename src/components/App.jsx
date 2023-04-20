import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Heading, Contacts } from './App.styled';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import initialContacts from './contacts/contacts.json';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  return [state, setState];
};

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const dublicateContact = data => {
    contacts.find(item => item.name === data.name);
  };

  const dublicateNumber = data => {
    return contacts.find(item => item.number === data.number);
  };

  const formSubmitHandler = data => {
    if (dublicateContact(data) || dublicateNumber(data)) {
      return alert(`${data.name} is already in contacts`);
    }
    const contact = {
      id: nanoid(),
      ...data,
    };

    setContacts([contact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Heading>Phonebook</Heading>
      <Form onSubmit={formSubmitHandler} />
      <Contacts>Contacts</Contacts>
      <Filter filter={filter} onChangeFilter={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;
