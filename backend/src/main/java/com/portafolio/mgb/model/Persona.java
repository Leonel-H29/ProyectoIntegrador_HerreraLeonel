package com.portafolio.mgb.model;

import com.portafolio.mgb.security.Entidad.Rol;
import com.portafolio.mgb.security.Entidad.Usuario;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idpersona;

    @NotNull
    @Size(min = 1, max = 60, message = "La longitud del nombre no es valida")
    private String nombre;

    @NotNull
    @Size(min = 1, max = 60, message = "La longitud del apellido no es valida")
    private String apellido;

    @Size(min = 0, max = 200, message = "La longitud de la descripcion no es valida")
    private String descripcion;

    @NotNull
    @Size(min = 1, max = 45, message = "La longitud de la provincia no es valida")
    private String provincia;

    @NotNull
    @Size(min = 1, max = 45, message = "La longitud del pais no es valida")
    private String pais;

    @NotNull
    private int codigo_postal;

    @NotNull
    private LocalDate fecha_nacimiento;

    @Size(min = 0, max = 12, message = "La longitud del telefono no es valida")
    private String telefono;

    @Size(min = 0, max = 100, message = "La longitud del link de perfil no es valida")
    private String foto_perfil_url;
    
    //@JoinColumn(name="idusuario", unique=true)
    //@OneToOne(cascade=CascadeType.ALL)
    //private Usuario usuario;

    public Persona() {
    }

    public Persona(String nombre, String apellido, String descripcion, String provincia, String pais, int codigo_postal, LocalDate fecha_nacimiento, String telefono, String foto_perfil_url) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.descripcion = descripcion;
        this.provincia = provincia;
        this.pais = pais;
        this.codigo_postal = codigo_postal;
        this.fecha_nacimiento = fecha_nacimiento;        
        this.telefono = telefono;
        this.foto_perfil_url = foto_perfil_url;
    }

}
