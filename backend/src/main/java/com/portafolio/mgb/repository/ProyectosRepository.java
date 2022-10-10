package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.Proyectos;
import java.time.LocalDate;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProyectosRepository extends JpaRepository<Proyectos, Integer> {

    @Modifying
    @Query(
            value = "INSERT INTO proyectos (nombre,descripcion,fecha_inicio,fecha_fin,url_proyecto,idpersona) VALUES (?1,?2,?3,?4,?5,?6);",
            nativeQuery = true
    )
    public void SaveProyectoSQL(String NameP, String desc, LocalDate FInicio, LocalDate FFin, String urlP, Long idPers);


    @Modifying
    @Query(
            value = "UPDATE proyectos P SET P.nombre =?1,P.descripcion =?2,P.fecha_inicio =?3,P.fecha_fin =?4,P.url_proyecto =?5,P.idpersona =?6 WHERE P.idproyecto =?7;",
            nativeQuery = true
    )
    public void EditProyectoSQL(String NameP, String desc, LocalDate FInicio, LocalDate FFin, String urlP, Long idPers, int id);

}
