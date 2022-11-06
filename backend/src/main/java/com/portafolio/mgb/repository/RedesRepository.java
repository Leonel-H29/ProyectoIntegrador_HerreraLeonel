package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.Redes;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RedesRepository extends JpaRepository<Redes, Integer> {
    
    @Query(
            value = "SELECT * FROM redes r WHERE r.idpersona=?1",
            nativeQuery = true
    )
    public List<Redes> ListRedesByIdPersona(int idPers);
    
}
