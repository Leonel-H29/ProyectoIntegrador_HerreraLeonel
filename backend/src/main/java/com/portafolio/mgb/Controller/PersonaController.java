package com.portafolio.mgb.Controller;

import com.portafolio.mgb.Interface.IPersonaService;
import com.portafolio.mgb.model.Persona;
import java.time.LocalDate;
//import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class PersonaController {

    @Autowired
    private IPersonaService perServ;

    @PostMapping("/personas/new")
    public void agregarPersona(@RequestBody Persona pers) {
        perServ.crearPersona(pers);
    }

    @GetMapping("/personas/list")
    @ResponseBody
    public List<Persona> verPersonas() {
        return perServ.verPersonas();
    }

    @DeleteMapping("/personas/delete/{id}")
    public void borrarPersona(@PathVariable long id) {
        perServ.eliminarPersona(id);
    }

    @PutMapping("/personas/edit/{id}")
    public void editarPersona(@PathVariable long id,
            @RequestParam("nombre") String nNombre,
            @RequestParam("apellido") String nApellido,
            @RequestParam("descripcion") String nDescripcion,
            @RequestParam("provincia") String nProvincia,
            @RequestParam("pais") String nPais,
            @RequestParam("codigo_postal") int nCodigoP,
            @RequestParam("fecha_nacimiento") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate nFechaN,
            @RequestParam("telefono") String nTelefono,
            @RequestParam("correo") String nCorreo,
            @RequestParam("foto_perfil_url") String nFoto,
            @RequestParam("username") String nUsername,
            @RequestParam("password") String nPassword
    ) {
        perServ.editarPersona(id, nNombre, nApellido, nDescripcion, nProvincia, nPais, nCodigoP, nFechaN, nTelefono, nCorreo, nFoto, nUsername, nPassword);

    }

    @GetMapping("/personas/{id}")
    public Persona findPersona(@PathVariable long id) {
        return perServ.buscarPersona(id);
    }

    @GetMapping("/personas/{username}")
    public Optional<Persona> findByUsername(@PathVariable String username) {
        Optional<Persona> persona = perServ.getByUsername(username);
        return persona;
    }

    @GetMapping("/personas/{correo}")
    public boolean findByCorreo(@PathVariable String correo) {
        return perServ.existsByCorreo(correo);

    }
}
