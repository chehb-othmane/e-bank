package ma.ebank.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "id")
public class Client extends User {

    @Column(unique = true, nullable = false)
    private String identityNumber;

    @Temporal(TemporalType.DATE)
    private java.util.Date birthDate;

    private String address;

    @OneToMany(mappedBy = "client")
    private List<BankAccount> bankAccounts;
}