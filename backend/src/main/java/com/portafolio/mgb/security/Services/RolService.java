
package com.portafolio.mgb.security.Services;

import com.portafolio.mgb.security.Entidad.Rol;
import com.portafolio.mgb.security.Enums.RolNombre;
import com.portafolio.mgb.security.repository.RolRepository;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class RolService {
    @Autowired
    RolRepository rolRepo;
    
    public Optional<Rol> getByRolNombre(RolNombre rolName){
        return rolRepo.findByRolNombre(rolName);
    }
    
    public void save(Rol rol){
        rolRepo.save(rol);
    }
}
