package com.portafolio.mgb.Interface;

import com.portafolio.mgb.model.TipoEmpleo;
import java.util.List;


public interface ITipoEmpleoService {
    public List<TipoEmpleo> list();
    public TipoEmpleo buscarEmpleo(int id);
    public void GuardarTipo(TipoEmpleo tipo);
    public void EliminarTipo(int id);
    public boolean existsById(int id);
    
}
