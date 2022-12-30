package com.portafolio.mgb.Interface;

import com.portafolio.mgb.model.Persona;
import com.portafolio.mgb.security.Entidad.Usuario;
import java.time.LocalDate;
import java.util.List;

public interface IPersonaService {

    public List<Persona> verPersonas();
    
    public void crearPersona(Persona pers);

    public void editarPersona(int id, String nNombre, String nApellido,String nProfesion ,String nDescripcion, String nProvincia, String nPais, int nCodigoP, LocalDate nFechaN, String nTelefono, String nFoto, Usuario user);

    public Persona buscarPersona(int id);

    public void eliminarPersona(int id);
    
    public Persona getByUserNameSQL(String username);
    
    public void addRedes(int id);

}
