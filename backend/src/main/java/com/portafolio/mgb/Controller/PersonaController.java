package com.portafolio.mgb.Controller;

import com.portafolio.mgb.Interface.IPersonaService;
import com.portafolio.mgb.model.Persona;
import java.time.LocalDate;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/personas")
@CrossOrigin(origins = "http://localhost:4200/")
public class PersonaController {

    @Autowired
    private IPersonaService perServ;

    @PostMapping("/new")
    public void agregarPersona(@RequestBody Persona pers) {
        perServ.crearPersona(pers);
    }

    //@PreAuthorize("hasRole('USER')")
    @GetMapping("/list")
    @ResponseBody
    public List<Persona> verPersonas() {
        return perServ.verPersonas();
    }

    @DeleteMapping("/delete/{id}")
    public void borrarPersona(@PathVariable int id) {
        perServ.eliminarPersona(id);
    }

    @PutMapping("/edit/{id}")
    /*
    public void editarPersona(@PathVariable int id,
            @RequestParam("nombre") String nNombre,
            @RequestParam("apellido") String nApellido,
            @RequestParam("descripcion") String nDescripcion,
            @RequestParam("provincia") String nProvincia,
            @RequestParam("pais") String nPais,
            @RequestParam("codigo_postal") int nCodigoP,
            @RequestParam("fecha_nacimiento") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate nFechaN,
            @RequestParam("telefono") String nTelefono,
            @RequestParam("foto_perfil_url") String nFoto
    ) {
        perServ.editarPersona(id, nNombre, nApellido, nDescripcion, nProvincia, nPais, nCodigoP, nFechaN, nTelefono, nFoto);

    }*/
    public void editarPersona(@PathVariable int id, @RequestBody Persona per
    ) {

        perServ.editarPersona(id, per.getNombre(), per.getApellido(), per.getDescripcion(), per.getProvincia(), per.getPais(), per.getCodigo_postal(), per.getFecha_nacimiento(), per.getTelefono(), per.getFoto_perfil_url(), per.getUsuario());

    }

    @GetMapping("/{id}")
    public Persona findPersona(@PathVariable int id) {
        return perServ.buscarPersona(id);
    }

    @GetMapping("/user/{username}")
    public Persona findPersonaSQL(@PathVariable String username) {
        return perServ.getByUserNameSQL(username);
    }

}
