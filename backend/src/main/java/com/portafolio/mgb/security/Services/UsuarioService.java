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

    public boolean existsByUserName(String username) {
        return UserRepo.existsByUsername(username);
    }

    public boolean existsByCorreo(String correo) {
        return UserRepo.existsByCorreo(correo);
    }
    
    public void save(Usuario usuario){
        UserRepo.save(usuario);
    }
    
    
}
