package com.portafolio.mgb.service;

import com.portafolio.mgb.Interface.IPersonaService;
import com.portafolio.mgb.model.Persona;
import com.portafolio.mgb.repository.PersonaRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
//import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PersonaService implements IPersonaService {

    @Autowired
    public PersonaRepository RepoPers;

    @Override
    public List<Persona> verPersonas() {
        try {
            List<Persona> personas = RepoPers.findAll();
            if (!personas.isEmpty()) {
                //System.out.println("Listado de personas: " + personas);
                return personas;
            } else {
                personas = new ArrayList<Persona>();
                //System.out.println("Vacio");
                return personas;
            }
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
            return new ArrayList<Persona>();
        }

    }

    @Override
    public void crearPersona(Persona pers) {
        try {
            RepoPers.save(pers);
            System.out.println("La persona ya se encuentra registrada");
            System.out.println(pers);
            /*
            if (buscarPersona(pers.getIdpersona()) != pers) {
                RepoPers.save(pers);
                System.out.println(pers);
            }
            else{
                System.out.println("La persona ya se encuentra registrada");
            }
             */
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
        }

    }

    @Override
    public void editarPersona(Long id,
            String nNombre,
            String nApellido,
            String nDescripcion,
            String nProvincia,
            String nPais,
            int nCodigoP,
            LocalDate nFechaN,
            String nTelefono,
            String nCorreo,
            String nFoto,
            String nUsername, 
            String nPassword
    ) {

        try {
            Persona persona = buscarPersona(id);
            persona.setNombre(nNombre);
            persona.setApellido(nApellido);
            persona.setDescripcion(nDescripcion);
            persona.setProvincia(nProvincia);
            persona.setPais(nPais);
            persona.setCodigo_postal(nCodigoP);
            persona.setFecha_nacimiento(nFechaN);
            persona.setTelefono(nTelefono);
            persona.setCorreo(nCorreo);
            persona.setFoto_perfil_url(nFoto);
            persona.setUsername(nUsername);
            persona.setPassword(nPassword);
            System.out.println(persona);
            RepoPers.save(persona);
            //return persona;
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
            //return new Persona();
        }
    }

    @Override
    public Persona buscarPersona(Long id) {
        /*
        Si encuentra a la persona la retorna en caso contrario devolvera null
         */
        System.out.println(RepoPers.findById(id).orElse(null));
        return RepoPers.findById(id).orElse(null);
    }

    @Override
    public void eliminarPersona(Long id) {
        RepoPers.deleteById(id);

        try {
            RepoPers.deleteById(id);
            System.out.println("Persona eliminada");
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
        }
    }
    
    @Override
    public Optional<Persona> getByUsername(String username) {
        //RepoPers.findBy(example, queryFunction)
        return RepoPers.findByUsername(username);
        
    }
    @Override
    public boolean existsByUsername(String username) {
        return RepoPers.existsByUsername(username);
    }
    @Override
    public boolean existsByCorreo(String correo) {
        return RepoPers.existsByCorreo(correo);
    }


}
