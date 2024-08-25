package jm.aerocompare.dto;

import jm.aerocompare.model.ERole;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String name;
    private String surname;
    private String email;
    private ERole role;
}
