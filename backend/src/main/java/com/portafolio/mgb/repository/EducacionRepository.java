package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.Educacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EducacionRepository extends JpaRepository<Educacion, Integer>{
    
}
