package com.portafolio.mgb.security.Entidad;

import com.portafolio.mgb.model.Persona;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class MainUser implements UserDetails {

    //private String nombre;
    private String username;
    private String correo;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public MainUser(String username, String correo, String password, Collection<? extends GrantedAuthority> authorities) {
        //this.nombre = nombre;
        this.username = username;
        this.correo = correo;
        this.password = password;
        this.authorities = authorities;
    }

    public static MainUser build(Persona persona) {
        List<GrantedAuthority> authorities = persona.getRoles().stream().map(rol -> new SimpleGrantedAuthority(rol.getRolNombre().name())).collect(Collectors.toList());
        return new MainUser(persona.getUsername(), persona.getCorreo(), persona.getPassword(), authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    public String getCorreo() {
        return this.correo;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
