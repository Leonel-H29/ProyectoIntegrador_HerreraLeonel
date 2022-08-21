package com.portafolio.mgb.Interface;

import com.portafolio.mgb.model.Experiencia;
import java.util.List;
//import java.util.Optional;

public interface IExperienciaService {

    public List<Experiencia> listExperiencia();

    public Experiencia buscarExperiencia(int id);

    //public Optional<Experiencia> getByNombreExperiencia(String nombre_empresa);

    public void GuardarExperiencia(Experiencia expe);

    public void EliminarExperiencia(int id);

    public boolean existsById(int id);

   // public boolean existsByNombreExpe(String nombre_empresa);

}
