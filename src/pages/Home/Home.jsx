import React from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Contacts } from '../../components/Contacts/Contacts';
import { ChatWindow } from '../../components/ChatWindow/ChatWindow';
import { useChat } from '../../context/ChatContext';
import './Home.css';

function Home() {
  const { activeContact, setActiveContact } = useChat();

  return (
    <div className={`app_container ${activeContact ? 'has_active_chat' : ''}`}>
      {/* Botón flotante para regresar a la lista de contactos en pantallas móviles */}
      {activeContact && (
        <button 
          className="mobile_back_button"
          onClick={() => setActiveContact(null)}
          aria-label="Volver a la lista de contactos"
        >
          <i className="bi bi-arrow-left"></i> Volver a contactos
        </button>
      )}

      <Sidebar>
        <Contacts />
      </Sidebar>

      <ChatWindow />
    </div>
  );
}

export { Home };