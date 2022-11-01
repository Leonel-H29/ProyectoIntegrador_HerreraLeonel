package com.portafolio.mgb.security.repository;

import com.portafolio.mgb.security.Entidad.Usuario;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByCorreo(String correo);

    @Query(
            value = "SELECT * FROM usuario WHERE username=?1 LIMIT 1",
            nativeQuery = true
    )
    Usuario findByUsernameSQL(String username);

    @Query(
            value = "SELECT * FROM usuario WHERE idusuario=?1 LIMIT 1",
            nativeQuery = true
    )
    Usuario findByIDUsernameSQL(int idUs);

    @Query(
            value = "SELECT * FROM usuario WHERE idusuario=(SELECT idusuario FROM persona WHERE idpersona = ?1) LIMIT 1",
            nativeQuery = true
    )
    Usuario findByIdPersona(int idP);

    @Modifying
    @Query(
            value = "UPDATE usuario u SET u.correo=?2,u.username=?3,u.password=?4 WHERE u.idusuario=?1",
            nativeQuery = true
    )
    void EditUsuario(int idUs, String correo, String username, String pass);

    //Para eliminar todos los datos del usuario
    @Modifying
    @Query(
            value = "DELETE FROM experiencia_laboral WHERE idpersona=(SELECT idpersona FROM persona WHERE idusuario=?1)",
            nativeQuery = true
    )
    void DeleteExperienciasByUsuaro(int idUs);

    @Modifying
    @Query(
            value = " DELETE FROM educacion WHERE idpersona=(SELECT idpersona FROM persona WHERE idusuario=?1)",
            nativeQuery = true
    )
    void DeleteEducacionesByUsuario(int idUs);

    @Modifying
    @Query(
            value = " DELETE FROM skills WHERE idpersona=(SELECT idpersona FROM persona WHERE idusuario=?1)",
            nativeQuery = true
    )
    void DeleteSkillsByUsuario(int idUs);

    @Modifying
    @Query(
            value = "DELETE FROM proyectos WHERE idpersona=(SELECT idpersona FROM persona WHERE idusuario=?1)",
            nativeQuery = true
    )
    void DeleteProyectosByUsuario(int idUs);

    @Modifying
    @Query(
            value = "DELETE FROM persona WHERE idusuario=?1",
            nativeQuery = true
    )
    void DeletePersonasByUsuario(int idUs);

    @Modifying
    @Query(
            value = "DELETE FROM usuario_rol WHERE idusuario=?1",
            nativeQuery = true
    )
    void DeleteRolUsuario(int idUs);

    @Modifying
    @Query(
            value = "DELETE FROM usuario u WHERE idusuario=?1",
            nativeQuery = true
    )
    void DeleteUsuario(int idUs);

}
