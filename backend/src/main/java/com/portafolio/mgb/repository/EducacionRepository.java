package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.Educacion;
import java.time.LocalDate;
//import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EducacionRepository extends JpaRepository<Educacion, Integer> {

    @Modifying
    @Query(
            value = "INSERT INTO educacion(nombre_institucion,fecha_inicio,fecha_fin,descripcion,idpersona) VALUES (?1,?2,?3,?4,?5);",
            nativeQuery = true
    )
    public void SaveEducacionSQL(String NameI, LocalDate FInicio, LocalDate FFin, String desc, Long idPers);
    
    
    @Modifying
    @Query(
            value = "UPDATE educacion SET nombre_institucion=?1,fecha_inicio=?2,fecha_fin=?3,descripcion=?4,idpersona=?5 WHERE ideducacion=?6;",
            nativeQuery = true
    )
    public void EditEducacionSQL(String NameI, LocalDate FInicio, LocalDate FFin, String desc, Long idPers, int idEdu);

}
