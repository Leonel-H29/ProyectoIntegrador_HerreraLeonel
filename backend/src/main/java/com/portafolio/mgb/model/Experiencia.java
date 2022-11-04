
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
//import javax.persistence.OneToMany;
//import javax.persistence.SecondaryTable;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "experiencia_laboral")
public class Experiencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idexperiencia;
    
    @NotNull
    @Size(min = 1, max = 45, message = "La longitud del nombre de la empresa no es valida")
    private String nombre_empresa;
    
    @NotNull
    private LocalDate fecha_inicio;
    
    private LocalDate fecha_fin;
    
    @Size(min = 0, max = 200, message = "La longitud de la descripcion no es valida")
    private String descripcion;
    
    //@JsonIgnore
    //@ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "idtipo_empleo")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private TipoEmpleo tipoEmpleo;
    
    //@JsonIgnore
    //@ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "idpersona")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Persona persona;

    public Experiencia() {
    }

    public Experiencia(String nombre_empresa, LocalDate fecha_inicio, LocalDate fecha_fin, String descripcion, TipoEmpleo tipoEmpleo, Persona persona) {
        this.nombre_empresa = nombre_empresa;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.descripcion = descripcion;
        this.tipoEmpleo = tipoEmpleo;
        this.persona = persona;
    }

    
    
    
    
    
    
   
}
