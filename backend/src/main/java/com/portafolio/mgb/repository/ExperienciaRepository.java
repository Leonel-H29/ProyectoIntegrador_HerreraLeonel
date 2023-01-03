package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.Experiencia;
import java.time.LocalDate;
import java.util.List;
//import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienciaRepository extends JpaRepository<Experiencia, Integer> {

    //public Optional<Experiencia> findByNombreEmpresa(final String nombre_empresa);
    //public boolean existsByNombreEmpresa(String nombre_empresa);
    @Query(
            value = "SELECT * FROM experiencia_laboral e WHERE e.idpersona=?1",
            nativeQuery = true
    )
    public List<Experiencia> ListExperienciaByIdPersona(int idPers);

    @Modifying
    @Query(
            value = "INSERT INTO experiencia_laboral(nombre_empresa,fecha_inicio,fecha_fin,descripcion,idpersona,idtipo_empleo) VALUES (?1,?2,?3,?4,?5,?6);",
            nativeQuery = true
    )
    public void SaveExperienciaSQL(String NameE, LocalDate FInicio, LocalDate FFin, String desc, int idPers, int idTE);

    @Modifying
    @Query(
            value = "UPDATE experiencia_laboral SET nombre_empresa=?1,fecha_inicio=?2,fecha_fin=?3,descripcion=?4,idpersona=?5,idtipo_empleo=?6 WHERE idexperiencia=?7;",
            nativeQuery = true
    )
    public void EditExperienciaSQL(String NameE, LocalDate FInicio, LocalDate FFin, String desc, int idPers, int idTE, int idExp);

}
