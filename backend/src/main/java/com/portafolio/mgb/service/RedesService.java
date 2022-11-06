package com.portafolio.mgb.service;

import com.portafolio.mgb.Interface.IRedesService;
import com.portafolio.mgb.model.Redes;
import com.portafolio.mgb.repository.RedesRepository;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class RedesService implements IRedesService{
    
    @Autowired
    RedesRepository RedRepo;

    @Override
    public List<Redes> listRedes() {
        try {
            List<Redes> _redes = RedRepo.findAll();
            if (!_redes.isEmpty()) {
                System.out.println("Listado de proyectos: " + _redes);
                return _redes;
            } else {
                _redes = new ArrayList<Redes>();
                System.out.println("Vacio");
                return _redes;
            }
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
            return new ArrayList<Redes>();
        }
    }
    /*
    @Override
    public Redes buscarProyecto(int id) {
        System.out.println(RedRepo.findById(id).orElse(null));
        return RedRepo.findById(id).orElse(null);
    }

    @Override
    public void GuardarProyecto(Redes proy) {
        try {
            if (proy != null) {
                //RedRepo.save(proy);
                if (existsById(proy.getIdproyecto())) {
                    System.out.println("El proyecto YA existe");
                    RedRepo.EditProyectoSQL(proy.getNombre(), proy.getDescripcion(), proy.getFecha_inicio(), proy.getFecha_fin(), proy.getUrl_proyecto(), proy.getPersona().getIdpersona(), proy.getIdproyecto());
                }
                RedRepo.SaveProyectoSQL(proy.getNombre(), proy.getDescripcion(), proy.getFecha_inicio(), proy.getFecha_fin(), proy.getUrl_proyecto(), proy.getPersona().getIdpersona());
            } else {
                System.out.println("No se ha podido guardar el proyecto");
            }
        } catch (Exception ex) {
            System.out.println("Error en Guardar Redes: " + ex.getMessage());
        }

    }

    @Override
    public void EliminarProyecto(int id) {
        try {
            if (existsById(id)) {
                RedRepo.deleteById(id);
                System.out.println("Proyecto eliminado");
            } else {
                System.out.println("No existe _redes con el id: " + id);
            }

        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
        }
    }

    @Override
    public boolean existsById(int id) {
        return RedRepo.existsById(id);
    }
    */
    @Override
    public List<Redes> ListRedesByIdPersona(int id) {
        try {
            List<Redes> _redes = RedRepo.ListRedesByIdPersona(id);
            if (!_redes.isEmpty()) {
                System.out.println("Listado de proyectos: " + _redes);
                return _redes;
            } else {
                _redes = new ArrayList<Redes>();
                System.out.println("Vacio");
                return _redes;
            }
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
            return new ArrayList<Redes>();
        }
    }
    
}
