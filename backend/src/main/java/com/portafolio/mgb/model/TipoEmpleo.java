package com.portafolio.mgb.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class TipoEmpleo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idtipo_empleo;
    @NotNull
    @Size(min = 1, max = 45, message = "La longitud del tipo no es valida")
    private String tipo;

    public TipoEmpleo() {
    }

    public TipoEmpleo(String tipo) {
        this.tipo = tipo;
    }

}
