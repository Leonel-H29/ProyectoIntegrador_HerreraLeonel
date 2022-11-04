
package com.portafolio.mgb.security.repository;

import com.portafolio.mgb.security.Entidad.Rol;
import com.portafolio.mgb.security.Enums.RolNombre;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer>{
    Optional<Rol> findByRolNombre(RolNombre rolnombre);
}
