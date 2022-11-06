package com.portafolio.mgb.Controller;

import com.portafolio.mgb.Interface.IPersonaService;
import com.portafolio.mgb.Interface.IRedesService;
import com.portafolio.mgb.model.Redes;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("redes")
@CrossOrigin(origins = {"https://portafolio-argentina-programa.web.app/","http://localhost:4200/"})
public class RedesController {
    
    @Autowired
    IRedesService RedesServ;

    @Autowired
    IPersonaService PerServ;
    
    @GetMapping("/list")
    public ResponseEntity<List<Redes>> list() {
        List<Redes> list = RedesServ.listRedes();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<List<Redes>> list(@PathVariable int id) {
        if (PerServ.buscarPersona(id) == null) {
            return new ResponseEntity("No se ha podido encontrar la persona", HttpStatus.BAD_REQUEST);
        }
        List<Redes> list = RedesServ.ListRedesByIdPersona(id);
        return new ResponseEntity(list, HttpStatus.OK);
    }
    
}
