package com.portafolio.mgb.Controller;

import com.portafolio.mgb.Interface.IEducacionService;
import com.portafolio.mgb.model.Educacion;
import com.portafolio.mgb.security.Controller.Mensaje;
import java.time.temporal.ChronoUnit;
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
@RequestMapping("educacion")
@CrossOrigin(origins = "http://localhost:4200/")
public class EducacionController {
    
    @Autowired
    IEducacionService EduServ;

    @GetMapping("/list")
    public ResponseEntity<List<Educacion>> list() {
        List<Educacion> list = EduServ.listEducacion();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Educacion educ) {
        if (StringUtils.isBlank(educ.getNombre_institucion())) {
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        }
       

        if (ChronoUnit.DAYS.between(educ.getFecha_inicio(), educ.getFecha_fin()) < 0) {
            return new ResponseEntity(new Mensaje("La fecha de comienzo no puede ser mayor a la de final"), HttpStatus.BAD_REQUEST);
        }       
        Educacion educacion = new Educacion(educ.getNombre_institucion(), educ.getFecha_inicio(), educ.getFecha_fin(), educ.getDescripcion(), educ.getPersona());
        EduServ.GuardarEducacion(educacion);
        return new ResponseEntity(new Mensaje("Educacion agregada"), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody Educacion educ) {
        //Valido el id
        if (!EduServ.existsById(id)) {
            return new ResponseEntity(new Mensaje("El id no existe"), HttpStatus.BAD_REQUEST);
        }
        //Controlo que el nombre no este en blanco
        if (StringUtils.isBlank(educ.getNombre_institucion())) {
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        //Controlo que la fecha de inicio no sea mayor a la de final
        if (ChronoUnit.DAYS.between(educ.getFecha_inicio(), educ.getFecha_fin()) < 0) {
            return new ResponseEntity(new Mensaje("La fecha de comienzo no puede ser mayor a la de final"), HttpStatus.BAD_REQUEST);
        }
        Educacion educacion = EduServ.buscarEducacion(id);
        educacion.setNombre_institucion(educ.getNombre_institucion());
        educacion.setDescripcion(educ.getDescripcion());
        educacion.setFecha_inicio(educ.getFecha_inicio());
        educacion.setFecha_fin(educ.getFecha_fin());
        educacion.setPersona(educ.getPersona());
        EduServ.GuardarEducacion(educacion);
        return new ResponseEntity(new Mensaje("Educacion actualizada"), HttpStatus.OK);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {

        if (!EduServ.existsById(id)) {
            return new ResponseEntity(new Mensaje("El id no existe"), HttpStatus.BAD_REQUEST);
        }
        EduServ.EliminarEducacion(id);
        return new ResponseEntity(new Mensaje("Educacion eliminada"), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> find(@PathVariable int id) {
        if (EduServ.buscarEducacion(id) == null) {
            return new ResponseEntity("No se ha podido encontrar la educacion", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(EduServ.buscarEducacion(id), HttpStatus.OK);
    }
    
}
