package com.portafolio.mgb.Interface;

import com.portafolio.mgb.model.Redes;
import java.util.List;

public interface IRedesService {

    public List<Redes> listRedes();

    public List<Redes> ListRedesByIdPersona(int idPers);

    public Redes buscarRed(int id);

    public void GuardarRed(Redes red);

    public void EliminarRed(int id);

    public boolean existsById(int id);

}
