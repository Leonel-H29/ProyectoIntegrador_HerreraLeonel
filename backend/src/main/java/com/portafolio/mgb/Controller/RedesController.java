package com.portafolio.mgb.Controller;

import com.portafolio.mgb.Interface.IPersonaService;
import com.portafolio.mgb.Interface.IRedesService;
import com.portafolio.mgb.model.Redes;
import com.portafolio.mgb.security.Controller.Mensaje;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("redes")
@CrossOrigin(origins = {"https://portafolio-argentina-programa.web.app/", "http://localhost:4200/","http://192.168.1.5:4200/"}, allowedHeaders = "*", exposedHeaders = "*")
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

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Redes Red) {
        /*
        if (Red == null) {
            return new ResponseEntity(new Mensaje("Hubo un error en los datos"), HttpStatus.BAD_REQUEST);
        }
*/
        
        if (StringUtils.isBlank(Red.getRed())) {
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        }

        Redes _red = new Redes(Red.getRed(), Red.getUrl_red(), Red.getPersona());
        RedesServ.GuardarRed(_red);
        return new ResponseEntity(new Mensaje("Red agregada"), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody Redes Red) {
        //Valido el id
        if (!RedesServ.existsById(id)) {
            return new ResponseEntity(new Mensaje("El id no existe"), HttpStatus.BAD_REQUEST);
        }
        //Controlo que el nombre no este en blanco
        if (StringUtils.isBlank(Red.getRed())) {
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        }

        Redes _red = RedesServ.buscarRed(id);
        _red.setRed(Red.getRed());
        _red.setUrl_red(Red.getUrl_red());
        _red.setPersona(Red.getPersona());
        RedesServ.GuardarRed(_red);
        return new ResponseEntity(new Mensaje("Red actualizada"), HttpStatus.OK);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {

        if (!RedesServ.existsById(id)) {
            return new ResponseEntity(new Mensaje("El id no existe"), HttpStatus.BAD_REQUEST);
        }
        RedesServ.EliminarRed(id);
        return new ResponseEntity(new Mensaje("Redecto eliminado"), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> find(@PathVariable int id) {
        if (RedesServ.buscarRed(id) == null) {
            return new ResponseEntity("No se ha podido encontrar la red", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(RedesServ.buscarRed(id), HttpStatus.OK);
    }
}
