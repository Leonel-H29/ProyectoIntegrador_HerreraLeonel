
package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.TipoEmpleo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoEmpleoRepository extends JpaRepository<TipoEmpleo, Integer>{
    
}
