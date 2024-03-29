package com.portafolio.mgb.service;

import com.portafolio.mgb.Interface.IPersonaService;
import com.portafolio.mgb.model.Persona;
import com.portafolio.mgb.repository.PersonaRepository;
import com.portafolio.mgb.security.Entidad.Usuario;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
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
            //RepoPers.save(pers);
            RepoPers.SavePersonaSQL(pers.getNombre(), pers.getApellido(), pers.getProvincia(), pers.getPais(), pers.getCodigo_postal(), pers.getFecha_nacimiento(), pers.getTelefono(), pers.getDescripcion(), pers.getFoto_perfil_url(), pers.getProfesion(),pers.getUsuario().getIdusuario());
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
            Persona persona = verPersonas().get(verPersonas().size() - 1);
            this.addRedes(persona.getIdpersona());

        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
        }

    }

    @Override
    public void editarPersona(int id,
            String nNombre,
            String nApellido,
            String nProfesion, 
            String nDescripcion,
            String nProvincia,
            String nPais,
            int nCodigoP,
            LocalDate nFechaN,
            String nTelefono,
            String nFoto,
            Usuario user
    ) {

        try {
            Persona persona = buscarPersona(id);
            persona.setNombre(nNombre);
            persona.setApellido(nApellido);
            persona.setProfesion(nProfesion);
            persona.setDescripcion(nDescripcion);
            persona.setProvincia(nProvincia);
            persona.setPais(nPais);
            persona.setCodigo_postal(nCodigoP);
            persona.setFecha_nacimiento(nFechaN);
            persona.setTelefono(nTelefono);

            persona.setFoto_perfil_url(nFoto);
            persona.setUsuario(user);

            System.out.println(persona);
            RepoPers.save(persona);
            //return persona;
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
            //return new Persona();
        }
    }

    @Override
    public Persona buscarPersona(int id) {
        /*
        Si encuentra a la persona la retorna en caso contrario devolvera null
         */
        System.out.println(RepoPers.findById(id).orElse(null));
        return RepoPers.findById(id).orElse(null);
    }

    @Override
    public void eliminarPersona(int id) {
        //RepoPers.deleteById(id);

        try {
            if (RepoPers.existsById(id)) {
                RepoPers.deleteById(id);
                System.out.println("Persona eliminada");
            } else {
                System.out.println("No existe persona con el id: " + id);
            }

        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
        }
    }

    @Override
    public Persona getByUserNameSQL(String username) {
        return RepoPers.findByUsernameSQL(username);
    }

    @Override
    public void addRedes(int id) {
        RepoPers.AddRedes("Facebook", id);
        RepoPers.AddRedes("Instagram", id);
        RepoPers.AddRedes("Twitter", id);
        RepoPers.AddRedes("Linkedin", id);
        RepoPers.AddRedes("GitHub", id);
    }

}
