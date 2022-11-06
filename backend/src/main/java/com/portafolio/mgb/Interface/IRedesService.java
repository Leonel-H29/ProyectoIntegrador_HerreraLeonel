package com.portafolio.mgb.Interface;

import com.portafolio.mgb.model.Redes;
import java.util.List;

public interface IRedesService {

    public List<Redes> listRedes();

    public List<Redes> ListRedesByIdPersona(int idPers);

}
