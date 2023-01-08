
package com.portafolio.mgb.Controller;


import com.portafolio.mgb.Interface.ITipoEmpleoService;
import com.portafolio.mgb.model.TipoEmpleo;
import com.portafolio.mgb.security.Controller.Mensaje;
//import java.time.temporal.ChronoUnit;
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
@RequestMapping("/tipoemp")
//@CrossOrigin(origins = {"https://portafolio-argentina-programa.firebaseapp.com", "http://localhost:4200","http://192.168.1.5:4200"}, allowedHeaders = "*", exposedHeaders = "*")
@CrossOrigin(origins = {"http://192.168.1.20:4200"}, allowedHeaders = "*", exposedHeaders = "*")
public class TipoEmpleoController {
    
    @Autowired
    ITipoEmpleoService ExpTipo;

    @GetMapping("/list")
    public ResponseEntity<List<TipoEmpleo>> list() {
        List<TipoEmpleo> list = ExpTipo.list();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody TipoEmpleo tipo) {
        if (StringUtils.isBlank(tipo.getTipo())) {
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        

        TipoEmpleo Newtipo = new TipoEmpleo(tipo.getTipo());
        ExpTipo.GuardarTipo(Newtipo);
        return new ResponseEntity(new Mensaje("Tipo Empleo agregado"), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody TipoEmpleo tipo) {
        //Valido el id
        if (!ExpTipo.existsById(id)) {
            return new ResponseEntity(new Mensaje("El id no existe"), HttpStatus.BAD_REQUEST);
        }
        //Controlo que el nombre no este en blanco
        if (StringUtils.isBlank(tipo.getTipo())) {
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        
        TipoEmpleo Newtipo = ExpTipo.buscarEmpleo(id);
        Newtipo.setTipo(tipo.getTipo());
        ExpTipo.GuardarTipo(Newtipo);
        
      
       
        return new ResponseEntity(new Mensaje("Tipo Empleo actualizado"), HttpStatus.OK);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {

        if (!ExpTipo.existsById(id)) {
            return new ResponseEntity(new Mensaje("El id no existe"), HttpStatus.BAD_REQUEST);
        }
        ExpTipo.EliminarTipo(id);
        return new ResponseEntity(new Mensaje("Tipo Empleo eliminado"), HttpStatus.OK);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<?> find(@PathVariable int id) {
        if (ExpTipo.buscarEmpleo(id) == null) {
            return new ResponseEntity(new Mensaje("No se ha podido encontrar el tipo de empleo"), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(ExpTipo.buscarEmpleo(id), HttpStatus.OK);
    }
    
    @GetMapping("/explab/{id}")
    public ResponseEntity<?> findTipoByExperiencia(@PathVariable int id) {
        if (ExpTipo.buscarTipobyExperiencia(id) == null) {
            return new ResponseEntity(new Mensaje("No existe la persona con ese id"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(ExpTipo.buscarTipobyExperiencia(id), HttpStatus.OK);
    }
}
    

