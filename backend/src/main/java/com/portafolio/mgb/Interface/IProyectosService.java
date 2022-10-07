package com.portafolio.mgb.Interface;

import com.portafolio.mgb.model.Proyectos;
import java.util.List;
//import java.util.Optional;

public interface IProyectosService {

    public List<Proyectos> listProyectos();

    public Proyectos buscarProyecto(int id);

    //public Optional<Proyectos> getByNombreProyectos(String nombre_empresa);

    public void GuardarProyecto(Proyectos proy);

    public void EliminarProyecto(int id);

    public boolean existsById(int id);

   // public boolean existsByNombreExpe(String nombre_empresa);

}