package com.portafolio.mgb.Interface;

import com.portafolio.mgb.model.Educacion;
import java.util.List;


public interface IEducacionService {
    public List<Educacion> listEducacion();
    
    public List<Educacion> listEducacionByIdPersona(long id);

    public Educacion buscarEducacion(int id);

    //public Optional<Educacion> getByNombreEducacion(String nombre_empresa);

    public void GuardarEducacion(Educacion edu);

    public void EliminarEducacion(int id);

    public boolean existsById(int id);
}


