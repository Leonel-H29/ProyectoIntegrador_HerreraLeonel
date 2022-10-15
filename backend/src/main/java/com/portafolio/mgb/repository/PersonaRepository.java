package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.Persona;
import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long> {

    @Modifying
    @Query(
            value = "INSERT INTO persona (nombre,apellido,provincia,pais,codigo_postal,fecha_nacimiento,telefono,descripcion,foto_perfil_url,idusuario) "
            + "VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)",
            nativeQuery = true
    )
    public void SavePersonaSQL(String NameP, String ApeP, String ProvP, String PaisP, int codPostal, LocalDate FNac, String Tel, String desc, String urlFP, long idUs);

}
