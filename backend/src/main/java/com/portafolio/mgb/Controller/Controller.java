package com.portafolio.mgb.Controller;

import com.portafolio.mgb.model.Persona;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    
    List<Persona> listPersonas = new ArrayList();
    
    @GetMapping ("/hello/{nombre}")
    public String Hello(@PathVariable String nombre){
        return "Hello World " + nombre ;
    }
    @GetMapping("/chau")
    public String GoodBye(@RequestParam String nombre){
        return "Good Bye " + nombre;
    }
    
    @PostMapping("/new/persona")
    public void agregarPersona(@RequestBody Persona pers){
        listPersonas.add(pers);
    }
    @GetMapping("/ver/personas")
    @ResponseBody   
    public List<Persona> LookPersonas(){
        return listPersonas;
    }
}
