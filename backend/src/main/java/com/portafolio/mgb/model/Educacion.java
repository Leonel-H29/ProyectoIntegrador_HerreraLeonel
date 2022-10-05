package com.portafolio.mgb.model;

//import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "educacion")
public class Educacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ideducacion;
    
    @NotNull
    @Size(min = 1, max = 45, message = "La longitud del nombre de la institucion no es valida")
    private String nombre_institucion;
    
    @NotNull
    private LocalDate fecha_inicio;
    
    @NotNull
    private LocalDate fecha_fin;
    
    @Size(min = 0, max = 200, message = "La longitud de la descripcion no es valida")
    private String descripcion;
    
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "idpersona")
    //@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Persona persona;

    public Educacion() {
    }

    public Educacion(String nombre_institucion, LocalDate fecha_inicio, LocalDate fecha_fin, String descripcion, Persona persona) {
        this.nombre_institucion = nombre_institucion;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.descripcion = descripcion;
        this.persona = persona;
    }
    
    
}
