package com.portafolio.mgb.Controller;

import com.portafolio.mgb.model.Persona;
import com.portafolio.mgb.service.IPersonaService;
//import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    
    @Autowired
    private IPersonaService perServ;
    
    @PostMapping("/new/persona")
    public void agregarPersona(@RequestBody Persona pers){
        try{
            perServ.crearPersona(pers);
        }
        catch(Exception ex){
            System.out.println("No se ha podido realizar la peticion: " + ex.toString());
        }
    }
    
    @GetMapping("/ver/personas")
    @ResponseBody   
    public List<Persona> verPersonas(){
        return perServ.verPersonas();
    }
    
    @DeleteMapping("/delete/{id}")
    public void borrarPersona(@PathVariable Long id){
        perServ.eliminarPersona(id);
    }
}
