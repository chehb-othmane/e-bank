package ma.ebank.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(unique = true, nullable = false)
    protected String username;

    @Column(nullable = false)
    protected String password;

    protected String firstname;
    protected String lastname;

    @Column(unique = true)
    protected String email;

    @Column(nullable = false)
    protected String role; // CLIENT or AGENT_GUICHET

    @OneToMany(mappedBy = "user")
    private List<Transaction> transactions;

    // champs utiles pour Spring Security
    protected boolean enabled = true;
    protected boolean accountNonExpired = true;
    protected boolean accountNonLocked = true;
    protected boolean credentialsNonExpired = true;
}