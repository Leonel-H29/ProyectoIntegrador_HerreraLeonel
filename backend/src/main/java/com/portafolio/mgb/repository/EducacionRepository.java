package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.Educacion;
import java.time.LocalDate;
import java.util.List;
//import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EducacionRepository extends JpaRepository<Educacion, Integer> {
    
    @Query(
            value = "SELECT * FROM educacion e WHERE e.idpersona=?1",
            nativeQuery = true
    )
    public List<Educacion> ListEducacionByIdPersona(long idPers);

    @Modifying
    @Query(
            value = "INSERT INTO educacion(nombre_institucion,fecha_inicio,fecha_fin,descripcion,idpersona) VALUES (?1,?2,?3,?4,?5);",
            nativeQuery = true
    )
    public void SaveEducacionSQL(String NameI, LocalDate FInicio, LocalDate FFin, String desc, long idPers);

    @Modifying
    @Query(
            value = "UPDATE educacion SET educacion.nombre_institucion=?1,educacion.fecha_inicio=?2,educacion.fecha_fin=?3,educacion.descripcion=?4,educacion.idpersona=?5 WHERE educacion.ideducacion=?6;",
            nativeQuery = true
    )
    public void EditEducacionSQL(String NameI, LocalDate FInicio, LocalDate FFin, String desc, long idPers, int idEdu);

}
