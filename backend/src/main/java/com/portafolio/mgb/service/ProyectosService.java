package com.portafolio.mgb.service;

import com.portafolio.mgb.Interface.IProyectosService;
import com.portafolio.mgb.model.Proyectos;
import com.portafolio.mgb.repository.ProyectosRepository;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProyectosService implements IProyectosService {

    @Autowired
    ProyectosRepository ProyRepo;

    @Override
    public List<Proyectos> listProyectos() {
        try {
            List<Proyectos> proycacion = ProyRepo.findAll();
            if (!proycacion.isEmpty()) {
                System.out.println("Listado de proyectos: " + proycacion);
                return proycacion;
            } else {
                proycacion = new ArrayList<Proyectos>();
                System.out.println("Vacio");
                return proycacion;
            }
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
            return new ArrayList<Proyectos>();
        }
    }

    @Override
    public Proyectos buscarProyecto(int id) {
        System.out.println(ProyRepo.findById(id).orElse(null));
        return ProyRepo.findById(id).orElse(null);
    }

    @Override
    public void GuardarProyecto(Proyectos proy) {
        try {
            if (proy != null) {
                //ProyRepo.save(proy);
                if (existsById(proy.getIdproyecto())) {
                    System.out.println("El proyecto YA existe");
                    ProyRepo.EditProyectoSQL(proy.getNombre(), proy.getDescripcion(), proy.getFecha_inicio(), proy.getFecha_fin(), proy.getUrl_proyecto(), proy.getPersona().getIdpersona(), proy.getIdproyecto());
                }
                ProyRepo.SaveProyectoSQL(proy.getNombre(), proy.getDescripcion(), proy.getFecha_inicio(), proy.getFecha_fin(), proy.getUrl_proyecto(), proy.getPersona().getIdpersona());
            } else {
                System.out.println("No se ha podido guardar el proyecto");
            }
        } catch (Exception ex) {
            System.out.println("Error en Guardar Proyectos: " + ex.getMessage());
        }

    }

    @Override
    public void EliminarProyecto(int id) {
        try {
            if (existsById(id)) {
                ProyRepo.deleteById(id);
                System.out.println("Proyecto eliminado");
            } else {
                System.out.println("No existe proycacion con el id: " + id);
            }

        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
        }
    }

    @Override
    public boolean existsById(int id) {
        return ProyRepo.existsById(id);
    }

    @Override
    public List<Proyectos> listProyectosByIdPersona(int id) {
        try {
            List<Proyectos> proycacion = ProyRepo.ListProyectosByIdPersona(id);
            if (!proycacion.isEmpty()) {
                System.out.println("Listado de proyectos: " + proycacion);
                return proycacion;
            } else {
                proycacion = new ArrayList<Proyectos>();
                System.out.println("Vacio");
                return proycacion;
            }
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
            return new ArrayList<Proyectos>();
        }
    }

}
