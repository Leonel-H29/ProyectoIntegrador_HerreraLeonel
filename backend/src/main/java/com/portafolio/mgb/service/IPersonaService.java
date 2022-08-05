
package com.portafolio.mgb.service;

import com.portafolio.mgb.model.Persona;
import java.util.List;


public interface IPersonaService {
    public List<Persona> verPersonas();
    public void crearPersona(Persona pers);
    public Persona editarPersona(Long id);
    public Persona buscarPersona(Long id);
    public void eliminarPersona(Long id);
}
