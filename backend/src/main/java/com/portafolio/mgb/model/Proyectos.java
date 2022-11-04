package com.portafolio.mgb.model;

import com.fasterxml.jackson.annotation.JsonProperty;
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

@Getter
@Setter
@Entity
@Table(name = "proyectos ")
public class Proyectos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idproyecto;
    
    @NotNull
    @Size(min = 1, max = 45, message = "La longitud del nombre no es valida")
    private String nombre;
    
    @Size(min = 0, max = 200, message = "La longitud de la descripcion no es valida")
    private String descripcion;
    @NotNull
    private LocalDate fecha_inicio;
    
    private LocalDate fecha_fin;
    private String url_proyecto;
    
    //@ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "idpersona")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Persona persona;

    public Proyectos(String nombre, String descripcion, LocalDate fecha_inicio, LocalDate fecha_fin, String url_proyecto, Persona persona) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.url_proyecto = url_proyecto;
        this.persona = persona;
    }

    public Proyectos() {
    }
    
    
    
}
