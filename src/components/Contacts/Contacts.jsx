import React from 'react';
import { useChat } from '../../context/ChatContext';
import { useContactSearch } from '../../hooks/useContactSearch';
import "./Contacts.css";

function Contacts() {
  const { contacts, activeContact, setActiveContact } = useChat();
  const { filteredContacts } = useContactSearch(contacts);

  return (
    <div className="contacts_container">
      {filteredContacts.length === 0 ? (
        <p className="no_contacts">No se encontraron contactos</p>
      ) : (
        filteredContacts.map((contact) => (
          <button 
            key={contact.id} 
            type="button"
            className={`contact_item ${activeContact?.id === contact.id ? 'active' : ''}`}
            onClick={() => setActiveContact(contact)}
          >
            <img src={contact.photo} alt={`Foto de perfil de ${contact.name}`} />
            <div className="contact_info">
              <h2>{contact.name}</h2>
            </div>
          </button>
        ))
      )}
    </div>
  );
}

export { Contacts };