import { Section, ContactForm, Filter, ContactsList } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'Redux/selectors';
import { addContactThunk, fetchContactsThunk } from 'Redux/operations';
import { useEffect } from 'react';
import { filterContact } from 'Redux/ContactSlice';

export const App = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);
  const filterChange = e => {
    dispatch(filterContact(e.target.value));
  };
  const handleAddContact = ({ name, phone }) => {
    if (
      contacts.find(contact => contact.name === name || contact.phone === phone)
    ) {
      alert('This name is already in the contact list');
      return;
    }
    dispatch(addContactThunk({ name, phone }));
  };

  const getFilterContacts = () => {
    if (filter) {
      console.log(filter);
      const normalizedFilter = filter.toLowerCase();
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
    return contacts;
  };
  return (
    <>
      <Section title="PhoneBook">
        <ContactForm onSubmit={handleAddContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={filterChange} />
        <ContactsList contacts={getFilterContacts()} />
      </Section>
    </>
  );
};
