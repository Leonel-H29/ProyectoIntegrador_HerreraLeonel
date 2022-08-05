package com.portafolio.mgb.service;

import com.portafolio.mgb.model.Persona;
import com.portafolio.mgb.repository.PersonaRepository;
import java.util.List;
//import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonaService implements IPersonaService {
    
    @Autowired
    public PersonaRepository RepoPers;

    @Override
    public List<Persona> verPersonas() {
        return RepoPers.findAll();
    }

    @Override
    public void crearPersona(Persona pers) {
        RepoPers.save(pers);
    }

    @Override
    public Persona editarPersona(Long id) {
        Persona pers = new Persona();
        return pers; 
    }

    @Override
    public Persona buscarPersona(Long id) {
        /*
        Si encuentra a la persona la retorna en caso contrario devolvera null
        */
       return RepoPers.findById(id).orElse(null);
    }

    @Override
    public void eliminarPersona(Long id) {
        RepoPers.deleteById(id);    
    }
    
}
