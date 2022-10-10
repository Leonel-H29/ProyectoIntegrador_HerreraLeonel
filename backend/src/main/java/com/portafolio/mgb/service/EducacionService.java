package com.portafolio.mgb.service;

import com.portafolio.mgb.Interface.IEducacionService;
import com.portafolio.mgb.model.Educacion;
import com.portafolio.mgb.repository.EducacionRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class EducacionService implements IEducacionService {

    @Autowired
    EducacionRepository EduRepo;

    @Override
    public List<Educacion> listEducacion() {
        try {
            List<Educacion> educacion = EduRepo.findAll();
            if (!educacion.isEmpty()) {
                System.out.println("Listado de educaciones: " + educacion);
                return educacion;
            } else {
                educacion = new ArrayList<Educacion>();
                System.out.println("Vacio");
                return educacion;
            }
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
            return new ArrayList<Educacion>();
        }
    }

    @Override
    public Educacion buscarEducacion(int id) {
        System.out.println(EduRepo.findById(id).orElse(null));
        return EduRepo.findById(id).orElse(null);
    }

    @Override
    public void GuardarEducacion(Educacion edu) {
        try {
            if (edu != null) {
                //EduRepo.save(edu);
                if (existsById(edu.getIdeducacion())) {
                    EduRepo.EditEducacionSQL(edu.getNombre_institucion(), edu.getFecha_inicio(), edu.getFecha_fin(), edu.getDescripcion(), edu.getPersona().getIdpersona(), edu.getIdeducacion());
                }
                EduRepo.SaveEducacionSQL(edu.getNombre_institucion(), edu.getFecha_inicio(), edu.getFecha_fin(), edu.getDescripcion(), edu.getPersona().getIdpersona());
            } else {
                System.out.println("No se ha podido guardar la educacion");
            }
        } catch (Exception ex) {
            System.out.println("Error en Guardar Educacion: " + ex.getMessage());
        }

    }

    @Override
    public void EliminarEducacion(int id) {
        try {
            if (existsById(id)) {
                EduRepo.deleteById(id);
                System.out.println("Educacion eliminada");
            } else {
                System.out.println("No existe educacion con el id: " + id);
            }

        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
        }
    }

    @Override
    public boolean existsById(int id) {
        return EduRepo.existsById(id);
    }

}
