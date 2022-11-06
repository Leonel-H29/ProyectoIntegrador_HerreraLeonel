package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.Redes;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RedesRepository extends JpaRepository<Redes, Integer> {

    @Query(
            value = "SELECT * FROM redes r WHERE r.idpersona=?1",
            nativeQuery = true
    )
    public List<Redes> ListRedesByIdPersona(int idPers);

    @Modifying
    @Query(
            value = "INSERT INTO redes (red,idpersona) VALUES (?1,?2);",
            nativeQuery = true
    )
    public void SaveRedSQL(String Red, int idPers);

    @Modifying
    @Query(
            value = "UPDATE redes r SET r.red =?1,r.idpersona =?2 WHERE r.idred =?3;",
            nativeQuery = true
    )
    public void EditRedSQL(String Red, int idPers, int id);

}
