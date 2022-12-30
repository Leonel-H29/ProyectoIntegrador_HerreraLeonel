package com.portafolio.mgb.security.Dto;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class NuevoUsuario {

    private String nombre;

    private String apellido;
    
    private String profesion;

    private String descripcion;

    private String provincia;

    private String pais;

    private int codigo_postal;

    private LocalDate fecha_nacimiento;

    private String telefono;

    private String correo;

    private String foto_perfil_url;

    private String username;

    private String password;

    private Set<String> roles = new HashSet<>();

}
