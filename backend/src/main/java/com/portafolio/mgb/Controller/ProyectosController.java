package com.portafolio.mgb.Controller;

import com.portafolio.mgb.Interface.IProyectosService;
import com.portafolio.mgb.model.Proyectos;
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
@RequestMapping("proyecto")
@CrossOrigin(origins = "http://localhost:4200/")
public class ProyectosController {

    @Autowired
    IProyectosService ProyServ;

    @GetMapping("/list")
    public ResponseEntity<List<Proyectos>> list() {
        List<Proyectos> list = ProyServ.listProyectos();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Proyectos Proy) {
        if (StringUtils.isBlank(Proy.getNombre())) {
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        }

        if (ChronoUnit.DAYS.between(Proy.getFecha_inicio(), Proy.getFecha_fin()) < 0) {
            return new ResponseEntity(new Mensaje("La fecha de comienzo no puede ser mayor a la de final"), HttpStatus.BAD_REQUEST);
        }
        Proyectos proyecto = new Proyectos(Proy.getNombre(), Proy.getDescripcion(), Proy.getFecha_inicio(), Proy.getFecha_fin(), Proy.getUrl_proyecto(), Proy.getPersona());
        ProyServ.GuardarProyecto(proyecto);
        return new ResponseEntity(new Mensaje("Proyecto agregado"), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody Proyectos Proy) {
        //Valido el id
        if (!ProyServ.existsById(id)) {
            return new ResponseEntity(new Mensaje("El id no existe"), HttpStatus.BAD_REQUEST);
        }
        //Controlo que el nombre no este en blanco
        if (StringUtils.isBlank(Proy.getNombre())) {
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        //Controlo que la fecha de inicio no sea mayor a la de final
        if (ChronoUnit.DAYS.between(Proy.getFecha_inicio(), Proy.getFecha_fin()) < 0) {
            return new ResponseEntity(new Mensaje("La fecha de comienzo no puede ser mayor a la de final"), HttpStatus.BAD_REQUEST);
        }
        Proyectos proyecto = ProyServ.buscarProyecto(id);
        proyecto.setNombre(Proy.getNombre());
        proyecto.setDescripcion(Proy.getDescripcion());
        proyecto.setFecha_inicio(Proy.getFecha_inicio());
        proyecto.setFecha_fin(Proy.getFecha_fin());
        proyecto.setUrl_proyecto(Proy.getUrl_proyecto());
        proyecto.setPersona(Proy.getPersona());
        ProyServ.GuardarProyecto(proyecto);
        return new ResponseEntity(new Mensaje("Proyecto actualizado"), HttpStatus.OK);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {

        if (!ProyServ.existsById(id)) {
            return new ResponseEntity(new Mensaje("El id no existe"), HttpStatus.BAD_REQUEST);
        }
        ProyServ.EliminarProyecto(id);
        return new ResponseEntity(new Mensaje("Proyecto eliminado"), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> find(@PathVariable int id) {
        if (ProyServ.buscarProyecto(id) == null) {
            return new ResponseEntity("No se ha podido encontrar el proyecto", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(ProyServ.buscarProyecto(id), HttpStatus.OK);
    }
}
