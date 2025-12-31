package ma.ebank.model;

import jakarta.persistence.*;
import lombok.*;
import ma.ebank.enums.TransactionType;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    private Double amount;

    private String description;

    @ManyToOne
    private BankAccount bankAccount;

    @ManyToOne
    private User user;
}
