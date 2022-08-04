package com.portafolio.mgb.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    
    @GetMapping ("/hello/{nombre}")
    public String Hello(@PathVariable String nombre){
        return "Hello World " + nombre ;
    }
    @GetMapping("/chau")
    public String GoodBye(@RequestParam String nombre){
        return "Good Bye " + nombre;
    }
}
