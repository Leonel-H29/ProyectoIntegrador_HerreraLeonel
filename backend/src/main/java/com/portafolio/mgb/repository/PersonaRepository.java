package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.Persona;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long> {

    Optional<Persona> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByCorreo(String correo);

}
