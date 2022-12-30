package com.portafolio.mgb.Controller;

import com.portafolio.mgb.Interface.IHardSkillsService;
import com.portafolio.mgb.Interface.IPersonaService;
import com.portafolio.mgb.model.HardSkills;
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
@RequestMapping("/hardskill")
@CrossOrigin(origins = {"https://portafolio-argentina-programa.firebaseapp.com","http://localhost:4200","http://192.168.1.5:4200"}, allowedHeaders = "*", exposedHeaders = "*")
public class HardSkillsController {
    
    @Autowired
    IHardSkillsService HSkillServ;
    
    @Autowired
    IPersonaService PerServ;

    @GetMapping("/list")
    public ResponseEntity<List<HardSkills>> list() {
        List<HardSkills> list = HSkillServ.listHardSkills();
        return new ResponseEntity(list, HttpStatus.OK);
    }
    
    @GetMapping("/list/{id}")
    public ResponseEntity<List<HardSkills>> list(@PathVariable int id) {
        if (PerServ.buscarPersona(id) == null) {
            return new ResponseEntity("No se ha podido encontrar la persona", HttpStatus.BAD_REQUEST);
        }
        List<HardSkills> list = HSkillServ.listHardSkillsByIdPersona(id);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody HardSkills HSkill) {
        if (StringUtils.isBlank(HSkill.getSkill())) {
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        }      
        HardSkills skill = new HardSkills(HSkill.getSkill(), HSkill.getPorcentaje(), HSkill.getPersona());
        HSkillServ.GuardarHardSkills(skill);
        return new ResponseEntity(new Mensaje("Hard Skill agregada"), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody HardSkills HSkill) {
        //Valido el id
        if (!HSkillServ.existsById(id)) {
            return new ResponseEntity(new Mensaje("El id no existe"), HttpStatus.BAD_REQUEST);
        }
        //Controlo que el nombre no este en blanco
        if (StringUtils.isBlank(HSkill.getSkill())) {
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        }
       
        HardSkills skill = HSkillServ.buscarHardSkills(id);
        skill.setSkill(HSkill.getSkill());
        skill.setPorcentaje(HSkill.getPorcentaje());
        skill.setPersona(HSkill.getPersona());
        HSkillServ.GuardarHardSkills(skill);
        return new ResponseEntity(new Mensaje("Hard Skill actualizada"), HttpStatus.OK);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {

        if (!HSkillServ.existsById(id)) {
            return new ResponseEntity(new Mensaje("El id no existe"), HttpStatus.BAD_REQUEST);
        }
        HSkillServ.EliminarHardSkills(id);
        return new ResponseEntity(new Mensaje("Hard Skill eliminada"), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> find(@PathVariable int id) {
        if (HSkillServ.buscarHardSkills(id) == null) {
            return new ResponseEntity("No se ha podido encontrar la skill", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(HSkillServ.buscarHardSkills(id), HttpStatus.OK);
    }
    
}
