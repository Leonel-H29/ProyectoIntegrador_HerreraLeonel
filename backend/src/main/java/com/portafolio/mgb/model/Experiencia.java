
package com.portafolio.mgb.model;

import java.time.LocalDate;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
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
    
    @NotNull
    private LocalDate fecha_fin;
    
    @Size(min = 0, max = 200, message = "La longitud de la descripcion no es valida")
    private String descripcion;
    
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "idtipo_empleo")
    private TipoEmpleo tipoEmpleo;
    
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "idpersona")
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
