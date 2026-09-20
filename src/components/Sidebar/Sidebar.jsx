import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import { useContactSearch } from '../../hooks/useContactSearch';
import "./Sidebar.css";

function Sidebar({ children }) {
  const { contacts, communities, createGroup } = useChat();
  const { query, handleSearchChange } = useContactSearch(contacts);
  
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [activeTab, setActiveTab] = useState("chats");

  const handleCreateGroupSubmit = (e) => {
    e.preventDefault();
    if (newGroupName.trim()) {
      createGroup(newGroupName);
      setNewGroupName("");
      setShowGroupModal(false);
    }
  };

  return (
    <div className="sidebar">
      {/* Barra de Iconos */}
      <div className="actionbar">
        <nav className="actionbar_nav">
          <button 
            type="button" 
            className={activeTab === "chats" ? "is_selected" : ""} 
            onClick={() => setActiveTab("chats")}
            title="Chats"
          >
            <i className="bi bi-chat-left-text-fill"></i>
          </button>
          
          <button 
            type="button" 
            className={activeTab === "communities" ? "is_selected" : ""} 
            onClick={() => setActiveTab("communities")}
            title="Comunidades"
          >
            <i className="bi bi-people-fill"></i>
          </button>

          <Link to="/profile" title="Ajustes">
            <i className="bi bi-gear-fill"></i>
          </Link>
        </nav>
      </div>

      <div className="sidebar_content">
        <div className="sidebar_header">
          <h2>{activeTab === "chats" ? "WhatsApp" : "Comunidades"}</h2>
          {activeTab === "chats" && (
            <button 
              className="add_group_btn" 
              onClick={() => setShowGroupModal(true)}
              title="Crear Nuevo Grupo"
            >
              <i className="bi bi-plus-lg"></i>
            </button>
          )}
        </div>

        {activeTab === "chats" ? (
          <>
            <div className="search_container">
              <input 
                type="search" 
                name="search" 
                placeholder="Buscar o empezar un chat nuevo" 
                value={query}
                onChange={handleSearchChange}
              />
              <i className="bi bi-search"></i>
            </div>

            <div className="contacts_wrapper">
              {children}
            </div>
          </>
        ) : (
          <div className="communities_wrapper">
            {communities.map((comm) => (
              <div key={comm.id} className="community_item">
                <img src={comm.photo} alt={comm.name} />
                <div>
                  <h3>{comm.name}</h3>
                  <p>{comm.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Crear Grupo */}
      {showGroupModal && (
        <div className="modal_backdrop">
          <form className="modal_content" onSubmit={handleCreateGroupSubmit}>
            <h3>Crear Nuevo Grupo</h3>
            <input 
              type="text" 
              placeholder="Nombre del grupo" 
              value={newGroupName} 
              onChange={(e) => setNewGroupName(e.target.value)} 
              required
            />
            <div className="modal_actions">
              <button type="button" onClick={() => setShowGroupModal(false)}>Cancelar</button>
              <button type="submit" className="confirm_btn">Crear</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export { Sidebar };