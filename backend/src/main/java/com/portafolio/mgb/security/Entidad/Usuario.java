
package com.portafolio.mgb.security.Entidad;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "usuario")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idusuario;
    
    @NotNull
    @Column(unique = true)
    @Email
    @Size(min = 1, max = 45, message = "La longitud del correo no es valida")
    private String correo;
    
    @NotNull
    @Column(unique = true)
    @Size(min = 6, max = 15, message = "La longitud del username no es valida")
    private String username;

    @NotNull
    @Size(min = 6, max = 60, message = "La longitud del password no es valida")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "usuario_rol", joinColumns = @JoinColumn(name = "idusuario"), inverseJoinColumns = @JoinColumn(name = "idrol"))
    private Set<Rol> roles = new HashSet<>();

    public Usuario() {
    }

    public Usuario(String correo, String username, String password) {
        this.correo = correo;
        this.username = username;
        this.password = password;
    }
    
    
}
