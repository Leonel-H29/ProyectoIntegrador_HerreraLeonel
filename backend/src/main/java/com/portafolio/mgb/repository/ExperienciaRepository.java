package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.Experiencia;
//import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienciaRepository extends JpaRepository<Experiencia, Integer> {

    //public Optional<Experiencia> findByNombreEmpresa(final String nombre_empresa);

    //public boolean existsByNombreEmpresa(String nombre_empresa);
}
