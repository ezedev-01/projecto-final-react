import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  return (
    <div className="profile_page">
      <div className="profile_card">
        <Link to="/" className="back_button"><i className="bi bi-arrow-left"></i> Volver al Chat</Link>
        <h1>Mi Perfil</h1>
        <div className="profile_avatar_container">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300" 
            alt="Foto de Perfil" 
          />
        </div>
        <div className="profile_info">
          <label>Nombre de usuario</label>
          <p>Usuario Alumno</p>
          <label>Info / Estado</label>
          <p>¡Disponible para chatear!</p>
        </div>
      </div>
    </div>
  );
}

export { Profile };