package com.portafolio.mgb.security.Services;


import com.portafolio.mgb.security.Entidad.MainUser;
import com.portafolio.mgb.security.Entidad.Usuario;

//import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsImpl implements UserDetailsService {

    @Autowired
    UsuarioService userS;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = userS.getByUserName(username).get();
        return MainUser.build(usuario);
    }
    
}
