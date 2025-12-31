package ma.ebank.dto.transaction;

import lombok.Data;

@Data
public class TransactionDTO {
    private Long id;
    private double amount;
    private String type;
    private String date;
}
