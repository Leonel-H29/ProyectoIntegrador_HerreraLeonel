package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.Persona;
import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Integer> {

    @Query(
            //value = "SELECT * FROM persona INNER JOIN usuario USING(idusuario) WHERE username=leomessi10",
            value = "SELECT * FROM persona WHERE idusuario=(SELECT idusuario FROM usuario WHERE username = ?1) LIMIT 1",
            nativeQuery = true
    )
    Persona findByUsernameSQL(String username);

    @Modifying
    @Query(
            value = "INSERT INTO persona (nombre,apellido,provincia,pais,codigo_postal,fecha_nacimiento,telefono,descripcion,foto_perfil_url, profesion,idusuario) "
            + "VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11)",
            nativeQuery = true
    )
    public void SavePersonaSQL(String NameP, String ApeP, String ProvP, String PaisP, int codPostal, LocalDate FNac, String Tel, String desc, String urlFP, String ProfP,int idUs);

    @Modifying
    @Query(
            value = "UPDATE persona p SET p.nombre=?1,p.apellido=?2,p.provincia=?3,p.pais=?4,p.codigo_postal=?5,p.fecha_nacimiento=?6,p.telefono=?7,p.descripcion=?8,p.foto_perfil_url=?9 "
            + "WHERE p.idpersona=?10",
            nativeQuery = true
    )
    public void EditPersonaSQL(String NameP, String ApeP, String ProvP, String PaisP, int codPostal, LocalDate FNac, String Tel, String desc, String urlFP, int idPer);

    @Modifying
    @Query(
            value = "INSERT INTO redes(red, url_red, idpersona) VALUES (?1,NULL,?2)", nativeQuery = true
    )
    public void AddRedes(String red, int idPer);
}
