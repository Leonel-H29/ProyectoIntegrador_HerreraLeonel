
package com.portafolio.mgb.security.Dto;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginUsuario {
    @NotBlank
    private String Username;
    @NotBlank
    private String Password;
}
