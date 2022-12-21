package com.portafolio.mgb.Controller;

import com.portafolio.mgb.Interface.IExperienciaService;
import com.portafolio.mgb.Interface.IPersonaService;
import com.portafolio.mgb.model.Experiencia;
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
//import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("explab")
@CrossOrigin(origins = {"https://portafolio-argentina-programa.web.app/","http://localhost:4200/","http://192.168.1.5:4200/"}, allowedHeaders = "*", exposedHeaders = "*")
public class ExperienciaController {

    @Autowired
    IExperienciaService ExpServ;

    @Autowired
    IPersonaService PerServ;

    @GetMapping("/list")
    public ResponseEntity<List<Experiencia>> list() {
        List<Experiencia> list = ExpServ.listExperiencia();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<List<Experiencia>> list(@PathVariable int id) {
        if (PerServ.buscarPersona(id) == null) {
            return new ResponseEntity("No se ha podido encontrar la persona", HttpStatus.BAD_REQUEST);
        }
        List<Experiencia> list = ExpServ.listExperienciaByIdPersona(id);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Experiencia exp) {
        if (StringUtils.isBlank(exp.getNombre_empresa())) {
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        //if (ExpServ.existsByNombreExpe(exp.getNombre_empresa())) {
        //return new ResponseEntity(new Mensaje("Esa experiencia ya existe"), HttpStatus.BAD_REQUEST);
        //}

        if (exp.getFecha_fin() != null && ChronoUnit.DAYS.between(exp.getFecha_inicio(), exp.getFecha_fin()) < 0) {
            return new ResponseEntity(new Mensaje("La fecha de comienzo no puede ser mayor a la de final"), HttpStatus.BAD_REQUEST);
        }

        Experiencia experiencia = new Experiencia(exp.getNombre_empresa(), exp.getFecha_inicio(), exp.getFecha_fin(), exp.getDescripcion(), exp.getTipoEmpleo(), exp.getPersona());

        ExpServ.GuardarExperiencia(experiencia);
        return new ResponseEntity(new Mensaje("Experiencia agregada"), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody Experiencia exp) {
        //Valido el id
        if (!ExpServ.existsById(id)) {
            return new ResponseEntity(new Mensaje("El id no existe"), HttpStatus.BAD_REQUEST);
        }
        //Controlo que el nombre no este en blanco
        if (StringUtils.isBlank(exp.getNombre_empresa())) {
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        //Comparo las experiencias
        //if (ExpServ.existsByNombreExpe(exp.getNombre_empresa()) && ExpServ.getByNombreExperiencia(exp.getNombre_empresa()).get().getIdexperiencia() != id) {
        //return new ResponseEntity(new Mensaje("Esa experiencia ya existe"), HttpStatus.BAD_REQUEST);
        //}
        //Controlo que la fecha de inicio no sea mayor a la de final
        if (exp.getFecha_fin() != null && ChronoUnit.DAYS.between(exp.getFecha_inicio(), exp.getFecha_fin()) < 0) {
            return new ResponseEntity(new Mensaje("La fecha de comienzo no puede ser mayor a la de final"), HttpStatus.BAD_REQUEST);
        }
        Experiencia experiencia = ExpServ.buscarExperiencia(id);
        experiencia.setNombre_empresa(exp.getNombre_empresa());
        experiencia.setDescripcion(exp.getDescripcion());
        experiencia.setFecha_inicio(exp.getFecha_inicio());
        experiencia.setFecha_fin(exp.getFecha_fin());
        experiencia.setTipoEmpleo(exp.getTipoEmpleo());
        experiencia.setPersona(exp.getPersona());
        ExpServ.GuardarExperiencia(experiencia);
        return new ResponseEntity(new Mensaje("Experiencia actualizada"), HttpStatus.OK);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {

        if (!ExpServ.existsById(id)) {
            return new ResponseEntity(new Mensaje("El id no existe"), HttpStatus.BAD_REQUEST);
        }
        ExpServ.EliminarExperiencia(id);
        return new ResponseEntity(new Mensaje("Experiencia eliminada"), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> find(@PathVariable int id) {
        if (ExpServ.buscarExperiencia(id) == null) {
            return new ResponseEntity("No se ha podido encontrar la experiencia", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(ExpServ.buscarExperiencia(id), HttpStatus.OK);
    }
    /*
    @GetMapping("/{id}")
    public Experiencia find(@PathVariable int id){
        return ExpServ.buscarExperiencia(id);
    }*/
}
