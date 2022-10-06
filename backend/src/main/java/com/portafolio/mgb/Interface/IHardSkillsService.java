package com.portafolio.mgb.Interface;

import com.portafolio.mgb.model.HardSkills;
import java.util.List;
//import java.util.Optional;

public interface IHardSkillsService {

    public List<HardSkills> listHardSkills();

    public HardSkills buscarHardSkills(int id);

    //public Optional<HardSkills> getByNombreHardSkills(String nombre_empresa);

    public void GuardarHardSkills(HardSkills skill);

    public void EliminarHardSkills(int id);

    public boolean existsById(int id);

   // public boolean existsByNombreExpe(String nombre_empresa);

}
