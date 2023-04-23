import { nanoid } from 'nanoid';
import { Heading, Contacts } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from '../redux/contactsSlice';
import { setFilter } from '../redux/filterSlice';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts);

  const filter = useSelector(state => state.filter);

  const formSubmitHandler = data => {
    const contact = {
      id: nanoid(),
      ...data,
    };

    const dublicateContact = contacts.find(item => item.name === contact.name);
    const dublicateNumber = contacts.find(
      item => item.number === contact.number
    );

    if (dublicateContact || dublicateNumber) {
      return alert(`${data.name} is already in contacts`);
    }
    dispatch(addContact(contact));
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const changeFilter = e => {
    const filterValue = e.target.value;
    dispatch(setFilter(filterValue));
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
      <ContactList
        contacts={visibleContacts}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
}
