package ma.ebank.dto.client;

import lombok.Data;
import java.util.Date;

@Data
public class ClientDTO {
    private Long id;
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private String email;
    private String identityNumber;
    private Date birthDate;
    private String address;
}