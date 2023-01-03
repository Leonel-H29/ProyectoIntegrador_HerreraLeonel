
package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.TipoEmpleo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoEmpleoRepository extends JpaRepository<TipoEmpleo, Integer>{
    
    @Query(
            value = "SELECT * FROM tipo_empleo WHERE idtipo_empleo=(SELECT idtipo_empleo FROM experiencia_laboral WHERE idexperiencia=?1);",
            nativeQuery = true
    )
    public TipoEmpleo GetTipoByExperiencia(int idExp);
    
}
