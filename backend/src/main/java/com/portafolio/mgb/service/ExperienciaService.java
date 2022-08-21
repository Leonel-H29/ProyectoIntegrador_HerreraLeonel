package com.portafolio.mgb.service;

import com.portafolio.mgb.Interface.IExperienciaService;
import com.portafolio.mgb.model.Experiencia;
import com.portafolio.mgb.repository.ExperienciaRepository;
import java.util.ArrayList;
import java.util.List;
//import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ExperienciaService implements IExperienciaService{

    @Autowired
    ExperienciaRepository ExpRepo;

    @Override
    public List<Experiencia> listExperiencia() {
        try {
            List<Experiencia> experiencias = ExpRepo.findAll();
            if (!experiencias.isEmpty()) {
                System.out.println("Listado de experiencias: " + experiencias);
                return experiencias;
            } else {
                experiencias = new ArrayList<Experiencia>();
                System.out.println("Vacio");
                return experiencias;
            }
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
            return new ArrayList<Experiencia>();
        }

    }

    @Override
    public Experiencia buscarExperiencia(int id) {
        System.out.println(ExpRepo.findById(id).orElse(null));
        return ExpRepo.findById(id).orElse(null);
    }
    /*
    @Override
    public Optional<Experiencia> getByNombreExperiencia(String nombre_empresa) {
        return null;
        //return ExpRepo.findByNombreEmpresa(nombre_empresa);
    }
    */

    @Override
    public void GuardarExperiencia(Experiencia expe) {
        try {
            if (expe != null) {
                ExpRepo.save(expe);
            } else {
                System.out.println("No se ha podido guardar la experiencia");
            }
        } catch (Exception ex) {
            System.out.println("Error en GuardarExperiencia: " + ex.getMessage());
        }

    }

    @Override
    public void EliminarExperiencia(int id) {

        try {
            if (existsById(id)) {
                ExpRepo.deleteById(id);
                System.out.println("Experiencia eliminada");
            } else {
                System.out.println("No existe persona con el id: " + id);
            }

        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
        }
    }
    
    @Override
    public boolean existsById(int id){
        return ExpRepo.existsById(id);
       
    }
    /*
    @Override
    public boolean existsByNombreExpe(String nombre_empresa){
        //return ExpRepo.existsByNombreEmpresa(nombre_empresa);
        return true;
    }
    */
}
