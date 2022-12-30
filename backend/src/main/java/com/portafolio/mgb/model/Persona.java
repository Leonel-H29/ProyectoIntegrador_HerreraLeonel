package com.portafolio.mgb.model;


import com.portafolio.mgb.security.Entidad.Usuario;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "persona")
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idpersona;

    @NotNull
    @Size(min = 1, max = 60, message = "La longitud del nombre no es valida")
    private String nombre;

    @NotNull
    @Size(min = 1, max = 60, message = "La longitud del apellido no es valida")
    private String apellido;
    
    @Size(min = 0, max = 20, message = "La longitud de la profesion no es valida")
    private String profesion;

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

    @Size(min = 0, max = 260, message = "La longitud del link de perfil no es valida")
    private String foto_perfil_url;
    
    
    //___________________________Relaciones___________________________
    
    //@JsonProperty("idusuario")
    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="idusuario", unique=true)
    private Usuario usuario;
    
    @OneToMany(mappedBy = "persona", cascade = CascadeType.ALL)
    private Set<Experiencia> experiencia = new HashSet<>();
    
    @OneToMany(mappedBy = "persona", cascade = CascadeType.ALL)
    private Set<Educacion> educacion = new HashSet<>();
    
    @OneToMany(mappedBy = "persona", cascade = CascadeType.ALL)
    private Set<HardSkills> hardSkill = new HashSet<>();
    
    @OneToMany(mappedBy = "persona", cascade = CascadeType.ALL)
    private Set<Redes> red = new HashSet<>();
    
    
    //___________________________Constructores___________________________
    public Persona() {
    }

    public Persona(String nombre, String apellido, String profesion, String descripcion, String provincia, String pais, int codigo_postal, LocalDate fecha_nacimiento, String telefono, String foto_perfil_url, Usuario usuario) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.profesion = profesion;
        this.descripcion = descripcion;
        this.provincia = provincia;
        this.pais = pais;
        this.codigo_postal = codigo_postal;
        this.fecha_nacimiento = fecha_nacimiento;
        this.telefono = telefono;
        this.foto_perfil_url = foto_perfil_url;
        this.usuario = usuario;
    }

    
    
    
    //___________________________Setters___________________________
    public void setExperiencia(Set<Experiencia> experiencia){
        this.experiencia = experiencia;
        for(Experiencia exp : experiencia){
            exp.setPersona(this);
        }
    }
    
    public void setEducacion(Set<Educacion> educacion){
        this.educacion = educacion;
        for(Educacion edu : educacion){
            edu.setPersona(this);
        }
    }
    
    public void setHardSkill(Set<HardSkills> hs){
        this.hardSkill = hs;
        for(HardSkills Skill : hardSkill){
            Skill.setPersona(this);
        }
    }
    
    public void setRed(Set<Redes> red){
        this.red = red;
        for(Redes _Red : red){
            _Red.setPersona(this);
        }
    }

}
