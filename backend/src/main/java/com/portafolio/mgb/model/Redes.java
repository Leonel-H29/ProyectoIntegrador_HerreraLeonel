package com.portafolio.mgb.model;

import com.fasterxml.jackson.annotation.JsonProperty;
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
@Table(name = "redes")
public class Redes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idred;

    @NotNull
    @Size(min = 1, max = 45, message = "La longitud del nombre de la red no es valida")
    String red;

    @Size(min = 0, max = 260, message = "La longitud del nombre del link no es valida")
    String url_red;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "idpersona")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    Persona persona;

    public Redes(String red, String url_red, Persona persona) {
        this.red = red;
        this.url_red = url_red;
        this.persona = persona;
    }

    public Redes() {
    }

}
