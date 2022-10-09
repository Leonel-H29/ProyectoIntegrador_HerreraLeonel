package com.portafolio.mgb.service;

import com.portafolio.mgb.Interface.IHardSkillsService;
import com.portafolio.mgb.model.HardSkills;
import com.portafolio.mgb.model.Persona;
import com.portafolio.mgb.repository.HardSkillsRepository;
import com.portafolio.mgb.repository.PersonaRepository;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class HardSkillsService implements IHardSkillsService{
    
    @Autowired
    HardSkillsRepository HskillRepo;
    
    //@Autowired
    //PersonaRepository PerRepo;

    @Override
    public List<HardSkills> listHardSkills() {
        try {
            List<HardSkills> skillcacion = HskillRepo.findAll();
            if (!skillcacion.isEmpty()) {
                System.out.println("Listado de skils: " + skillcacion);
                return skillcacion;
            } else {
                skillcacion = new ArrayList<HardSkills>();
                System.out.println("Vacio");
                return skillcacion;
            }
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
            return new ArrayList<HardSkills>();
        }
    }

    @Override
    public HardSkills buscarHardSkills(int id) {
        System.out.println(HskillRepo.findById(id).orElse(null));
        return HskillRepo.findById(id).orElse(null);
    }

    @Override
    public void GuardarHardSkills(HardSkills skill) {
        try {
            if (skill != null) {
                HskillRepo.SaveSkillSQL(skill.getSkill(), skill.getPorcentaje(), skill.getPersona().getIdpersona());
                //HskillRepo.save(skill);
            } else {
                System.out.println("No se ha podido guardar la skill");
            }
        } catch (Exception ex) {
            System.out.println("Error en Guardar Hard Skills: " + ex.getMessage());
        }

    }

    @Override
    public void EliminarHardSkills(int id) {
        try {
            if (existsById(id)) {
                HskillRepo.deleteById(id);
                System.out.println("Hard Skill eliminada");
            } else {
                System.out.println("No existe skillcacion con el id: " + id);
            }

        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
        }
    }

    @Override
    public boolean existsById(int id) {
        return HskillRepo.existsById(id);
    }
    
}
