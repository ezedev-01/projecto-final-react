import React, { createContext, useContext, useState } from 'react';

// Contactos iniciales (sin Meta AI ni grupo por defecto)
const initialContacts = [
  { 
    id: 1,
    name: "Ludmila",
    isGroup: false,
    photo: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=eaVcXTz5"
  },
  {
    id: 2,
    name: "Pedro",
    isGroup: false,
    photo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pierre-Person.jpg?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=original"
  },
  {
    id: 3,
    name: "Michael",
    isGroup: false,
    photo: "https://img.magnific.com/free-photo/young-handsome-man-wearing-casual-tshirt-blue-background-happy-face-smiling-with-crossed-arms-looking-camera-positive-person_839833-12963.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    id: 4,
    name: "Sarah",
    isGroup: false,
    photo: "https://www.yourtango.com/sites/default/files/image_blog/2024-10/signs-genuinely-kind-person-cant-be-faked.png"
  }
];

const initialCommunities = [
  {
    id: 1,
    name: "Desarrolladores Web",
    description: "Comunidad para compartir recursos sobre React y CSS.",
    photo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300"
  }
];

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [contacts, setContacts] = useState(initialContacts);
  const [communities] = useState(initialCommunities);
  const [activeContact, setActiveContact] = useState(null);
  
  const [chats, setChats] = useState({
    1: [
      { id: 1, text: "¡Hola! ¿Cómo estás?", sender: "contact", time: "10:30 AM" },
      { id: 2, text: "¡Todo bien! ¿Y tú?", sender: "me", time: "10:32 AM" }
    ]
  });

  // Enviar mensajes
  const sendMessage = (contactId, text) => {
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now(),
      text,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats((prev) => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), newMsg]
    }));
  };

  // Crear Grupo dinámicamente
  const createGroup = (name) => {
    if (!name.trim()) return;
    const newGroup = {
      id: Date.now(),
      name,
      isGroup: true,
      photo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300"
    };
    setContacts((prev) => [newGroup, ...prev]);
    setActiveContact(newGroup);
  };

  // Editar Nombre de Grupo
  const editGroup = (groupId, newName) => {
    setContacts((prev) => prev.map((c) => (c.id === groupId ? { ...c, name: newName } : c)));
    if (activeContact?.id === groupId) {
      setActiveContact((prev) => ({ ...prev, name: newName }));
    }
  };

  // Eliminar Grupo
  const deleteGroup = (groupId) => {
    setContacts((prev) => prev.filter((c) => c.id !== groupId));
    if (activeContact?.id === groupId) {
      setActiveContact(null);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        contacts,
        communities,
        activeContact,
        setActiveContact,
        messages: activeContact ? chats[activeContact.id] || [] : [],
        sendMessage,
        createGroup,
        editGroup,
        deleteGroup
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat debe usarse dentro de un ChatProvider");
  }
  return context;
}