package com.portafolio.mgb.security.Controller;



import com.portafolio.mgb.security.Dto.JwtDto;
import com.portafolio.mgb.security.Dto.LoginUsuario;
import com.portafolio.mgb.security.Dto.NuevoUsuario;
import com.portafolio.mgb.security.Entidad.Rol;
import com.portafolio.mgb.security.Entidad.Usuario;
import com.portafolio.mgb.security.Enums.RolNombre;
import com.portafolio.mgb.security.Services.RolService;
import com.portafolio.mgb.security.Services.UsuarioService;
import com.portafolio.mgb.security.jwt.JwtProvider;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    PasswordEncoder passEncoder;
    @Autowired
    AuthenticationManager authManager;
    @Autowired
    UsuarioService usuarioService;
    @Autowired
    RolService rolService;
    @Autowired
    JwtProvider jwtProvider;

    @PostMapping("/nuevo")
    public ResponseEntity<?> nuevo(@Valid @RequestBody NuevoUsuario NUsuario, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                return new ResponseEntity(new Mensaje("Campos mal puestos o email invalido"), HttpStatus.BAD_REQUEST);
            }

            if (usuarioService.existsByUserName(NUsuario.getUsername())) {
                return new ResponseEntity(new Mensaje("El nombre de usuario ya existe"), HttpStatus.BAD_REQUEST);
            }

            if (usuarioService.existsByCorreo(NUsuario.getCorreo())) {
                return new ResponseEntity(new Mensaje("El mail ya existe"), HttpStatus.BAD_REQUEST);
            }

            Usuario usuario = new Usuario(NUsuario.getCorreo(),NUsuario.getUsername(),passEncoder.encode(NUsuario.getPassword()));

            Set<Rol> roles = new HashSet<>();
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_USER).get());

            if (NUsuario.getRoles().contains("admin")) {
                roles.add(rolService.getByRolNombre(RolNombre.ROLE_ADMIN).get());
            }
            usuario.setRoles(roles);
            usuarioService.save(usuario);
            

            return new ResponseEntity(new Mensaje("Usuario guardado"), HttpStatus.CREATED);
        } catch (Exception ex) {
            System.out.println("No se ha podido realizar: " + ex.getMessage());
            return new ResponseEntity(new Mensaje(ex.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginUsuario loginUsuario, BindingResult bindingResult) {
        try{
            if (bindingResult.hasErrors()) {
            return new ResponseEntity(new Mensaje("Campos mal puestos"), HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(loginUsuario.getUsername(), loginUsuario.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities());
        return new ResponseEntity(jwtDto, HttpStatus.OK);
        }
        catch(AuthenticationException ex){
            System.out.println("No se ha podido realizar: " + ex.getMessage());
            return new ResponseEntity(new Mensaje(ex.getMessage()), HttpStatus.BAD_REQUEST);
        }

    }
    
    @GetMapping("/{username}")
    public Optional<Usuario> findPersona(@PathVariable String username) {
        return usuarioService.getByUserName(username);
    }

}
