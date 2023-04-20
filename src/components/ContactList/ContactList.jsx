import { Li, Ul, P, Button } from './ContactList.styled';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeleteContact }) => (
  <Ul>
    {contacts.map(({ id, name, number }) => (
      <Li key={id}>
        <P>
          {name}: {number}
        </P>
        <Button type="button" onClick={() => onDeleteContact(id)}>
          Delete
        </Button>
      </Li>
    ))}
  </Ul>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
