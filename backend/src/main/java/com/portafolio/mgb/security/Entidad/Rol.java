package com.portafolio.mgb.security.Entidad;

import com.portafolio.mgb.security.Enums.RolNombre;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
@Entity
@Table(name = "rol")
public class Rol {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int idrol;
    
    @NotNull @Enumerated(EnumType.STRING)
    private RolNombre rolNombre;

    public Rol() {
    }

    public Rol(RolNombre rolNombre) {
        this.rolNombre = rolNombre;
    }
    
    
}
