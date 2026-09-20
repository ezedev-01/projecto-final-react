import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { useChatInput } from '../../hooks/useChatInput';
import './ChatWindow.css';

function ChatWindow() {
  const { activeContact, messages, sendMessage, editGroup, deleteGroup } = useChat();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");

  const { inputText, handleChange, handleSubmit } = useChatInput((text) => {
    if (activeContact) {
      sendMessage(activeContact.id, text);
    }
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editName.trim() && activeContact) {
      editGroup(activeContact.id, editName);
      setIsEditing(false);
    }
  };

  if (!activeContact) {
    return (
      <div className="chat_window empty">
        <div className="empty_state">
          <i className="bi bi-whatsapp whatsapp_icon"></i>
          <h2>WhatsApp Web</h2>
          <p>Envía y recibe mensajes con tus contactos, grupos y Meta AI.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat_window">
      {/* Encabezado del Chat */}
      <div className="chat_header">
        <div className="chat_header_user">
          <img src={activeContact.photo} alt={activeContact.name} />
          <div className="chat_header_info">
            <h3>
              {activeContact.name} 
              {activeContact.isGroup && <span className="group_badge">(Grupo)</span>}
              {activeContact.isMetaAI && <span className="meta_badge"><i className="bi bi-stars"></i> IA</span>}
            </h3>
            <span>{activeContact.isGroup ? "Miembros del grupo" : "en línea"}</span>
          </div>
        </div>

        <div className="chat_header_actions">
          <button type="button" title="Llamar"><i className="bi bi-telephone"></i></button>
          <button type="button" title="Buscar"><i className="bi bi-search"></i></button>

          <div className="dropdown_container">
            <button type="button" onClick={() => setShowMenu(!showMenu)} title="Más opciones">
              <i className="bi bi-three-dots-vertical"></i>
            </button>

            {showMenu && activeContact.isGroup && (
              <div className="dropdown_menu">
                <button type="button" onClick={() => { setIsEditing(true); setEditName(activeContact.name); setShowMenu(false); }}>
                  Editar Grupo
                </button>
                <button type="button" className="delete_btn" onClick={() => { deleteGroup(activeContact.id); setShowMenu(false); }}>
                  Eliminar Grupo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cuerpo de Mensajes */}
      <div className="chat_body">
        {messages.map((msg) => (
          <div key={msg.id} className={`message_bubble ${msg.sender}`}>
            <p>{msg.text}</p>
            <span className="message_time">{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Entrada de texto */}
      <form className="chat_footer" onSubmit={handleSubmit}>
        <i className="bi bi-emoji-smile"></i>
        <i className="bi bi-paperclip"></i>
        <input
          type="text"
          placeholder={activeContact.isMetaAI ? "Pregunta algo a Meta AI..." : "Escribe un mensaje aquí"}
          value={inputText}
          onChange={handleChange}
        />
        <button type="submit">
          <i className="bi bi-send-fill"></i>
        </button>
      </form>

      {/* Modal Editar Nombre del Grupo */}
      {isEditing && (
        <div className="modal_backdrop">
          <form className="modal_content" onSubmit={handleEditSubmit}>
            <h3>Editar Nombre del Grupo</h3>
            <input 
              type="text" 
              value={editName} 
              onChange={(e) => setEditName(e.target.value)} 
              required
            />
            <div className="modal_actions">
              <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
              <button type="submit" className="confirm_btn">Guardar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export { ChatWindow };