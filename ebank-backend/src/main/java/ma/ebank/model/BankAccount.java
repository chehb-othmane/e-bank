package ma.ebank.model;

import jakarta.persistence.*;
import lombok.*;
import ma.ebank.enums.AccountStatus;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String rib;

    private Double balance;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Enumerated(EnumType.STRING)
    private AccountStatus status;

    @ManyToOne
    private Client client;

    @OneToMany(mappedBy = "bankAccount")
    private List<Transaction> transactions;
}
