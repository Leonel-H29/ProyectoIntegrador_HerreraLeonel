
package com.portafolio.mgb.model;

import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;


@Getter @Setter
@Entity
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
     
    private String nombre;
    private String apellido;
    private String provincia;
    private String pais;
    private int codigo_postal;
    private LocalDate fecha_nacimiento;
    private String foto_perfil_url;
    private String descripcion;
    
    
    public Persona(){}

    public Persona(String nombre, String apellido, String provincia, String pais, int codigo_postal, LocalDate fecha_nacimiento, String foto_perfil_url, String descripcion) {
        //this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.provincia = provincia;
        this.pais = pais;
        this.codigo_postal = codigo_postal;
        this.fecha_nacimiento = fecha_nacimiento;
        this.foto_perfil_url = foto_perfil_url;
        this.descripcion = descripcion;
    }
    
    
    
    
    
    
    
    
}
