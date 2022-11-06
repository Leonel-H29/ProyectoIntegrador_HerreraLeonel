package com.portafolio.mgb.service;

import com.portafolio.mgb.Interface.IRedesService;
import com.portafolio.mgb.model.Redes;
import com.portafolio.mgb.repository.RedesRepository;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class RedesService implements IRedesService {

    @Autowired
    RedesRepository RedRepo;

    @Override
    public List<Redes> listRedes() {
        try {
            List<Redes> _redes = RedRepo.findAll();
            if (!_redes.isEmpty()) {
                System.out.println("Listado de redectos: " + _redes);
                return _redes;
            } else {
                _redes = new ArrayList<Redes>();
                System.out.println("Vacio");
                return _redes;
            }
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
            return new ArrayList<Redes>();
        }
    }

    @Override
    public boolean existsById(int id) {
        return RedRepo.existsById(id);
    }

    @Override
    public List<Redes> ListRedesByIdPersona(int id) {
        try {
            List<Redes> _redes = RedRepo.ListRedesByIdPersona(id);
            if (!_redes.isEmpty()) {
                System.out.println("Listado de redectos: " + _redes);
                return _redes;
            } else {
                _redes = new ArrayList<Redes>();
                System.out.println("Vacio");
                return _redes;
            }
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
            return new ArrayList<Redes>();
        }
    }

    @Override
    public Redes buscarRed(int id) {
        System.out.println(RedRepo.findById(id).orElse(null));
        return RedRepo.findById(id).orElse(null);
    }

    @Override
    public void GuardarRed(Redes red) {
        try {
            if (red != null) {
                //RedRepo.save(red);
                if (existsById(red.getIdred())) {
                    System.out.println("El red ya existe");
                    RedRepo.EditRedSQL(red.getRed(), red.getPersona().getIdpersona(), red.getIdred());
                }
                RedRepo.SaveRedSQL(red.getRed(), red.getPersona().getIdpersona());
            } else {
                System.out.println("No se ha podido guardar la red");
            }
        } catch (Exception ex) {
            System.out.println("Error en Guardar Redes: " + ex.getMessage());
        }
    }

    @Override
    public void EliminarRed(int id) {
        try {
            if (existsById(id)) {
                RedRepo.deleteById(id);
                System.out.println("Red eliminada");
            } else {
                System.out.println("No existe red con el id: " + id);
            }

        } catch (Exception ex) {
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
        }
    }

}
