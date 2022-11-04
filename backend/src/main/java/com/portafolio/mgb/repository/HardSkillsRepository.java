package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.HardSkills;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HardSkillsRepository extends JpaRepository<HardSkills, Integer> {
    
    @Query(
            value = "SELECT * FROM skills s WHERE s.idpersona=?1",
            nativeQuery = true
    )
    public List<HardSkills> ListHardSkillsByIdPersona(long idPers);
    
    @Modifying
    @Query(
            value = "INSERT INTO skills (skill, porcentaje,idpersona) VALUES (?1,?2,?3);",
            nativeQuery = true
    )
    public void SaveSkillSQL(String Skill, int porc, long idpers);
    
    
    @Modifying
    @Query(
            value = "UPDATE skills SET skill=?1, porcentaje=?2,idpersona=?3 WHERE idskill=?4;",
            nativeQuery = true
    )
    public void EditSkillSQL(String Skill, int porc, long idpers, int idhs);

}
