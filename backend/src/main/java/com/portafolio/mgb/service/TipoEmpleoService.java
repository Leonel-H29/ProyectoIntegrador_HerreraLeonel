
package com.portafolio.mgb.service;

import com.portafolio.mgb.Interface.ITipoEmpleoService;
import com.portafolio.mgb.model.TipoEmpleo;
import com.portafolio.mgb.repository.TipoEmpleoRepository;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class TipoEmpleoService implements ITipoEmpleoService{
    
    @Autowired
    public TipoEmpleoRepository RepoTipo;

    @Override
    public List<TipoEmpleo> list() {
        try {
            List<TipoEmpleo> listTipo = RepoTipo.findAll();
            if (!listTipo.isEmpty()) {
                //System.out.println("Listado de listTipo: " + listTipo);
                return listTipo;
            } else {
                listTipo = new ArrayList<TipoEmpleo>();
                //System.out.println("Vacio");
                return listTipo;
            }
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
            return new ArrayList<TipoEmpleo>();
        }
    }

    @Override
    public TipoEmpleo buscarEmpleo(int id) {
        System.out.println(RepoTipo.findById(id).orElse(null));
        return RepoTipo.findById(id).orElse(null);
    }

    @Override
    public void GuardarTipo(TipoEmpleo tipo) {
        try {
            RepoTipo.save(tipo);
            System.out.println("El empleo ya se encuentra registrada");
            System.out.println(tipo);
            
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
        }
    }

    @Override
    public void EliminarTipo(int id) {
        try {
            if (RepoTipo.existsById(id)) {
                RepoTipo.deleteById(id);
                System.out.println("Tipo eliminado");
            } else {
                System.out.println("No existe persona con el id: " + id);
            }

        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
        }
    }

    @Override
    public boolean existsById(int id) {
        return RepoTipo.existsById(id);
    }
    
}
