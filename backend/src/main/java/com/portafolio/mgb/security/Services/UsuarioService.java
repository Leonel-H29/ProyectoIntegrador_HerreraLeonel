package com.portafolio.mgb.security.Services;

import com.portafolio.mgb.security.Entidad.Usuario;
import com.portafolio.mgb.security.repository.UsuarioRepository;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    UsuarioRepository UserRepo;

    public Optional<Usuario> getByUserName(String username) {
        return UserRepo.findByUsername(username);
    }
    
    public Usuario getByUserNameSQL(String username) {
        return UserRepo.findByUsernameSQL(username);
    }

    public boolean existsByUserName(String username) {
        return UserRepo.existsByUsername(username);
    }

    public boolean existsByCorreo(String correo) {
        return UserRepo.existsByCorreo(correo);
    }

    public void save(Usuario usuario) {
        if(UserRepo.existsById(usuario.getIdusuario())){
            UserRepo.EditUsuario(usuario.getIdusuario(), usuario.getCorreo(), usuario.getUsername(), usuario.getPassword());
        }
        else{
            UserRepo.save(usuario);
        }
    }
    
    public Usuario findByIdUsuario(int idP){
        return UserRepo.findByIDUsernameSQL(idP);
    }
    
    public Usuario findByIdPersona(int idP){
        return UserRepo.findByIdPersona(idP);
    }

}
