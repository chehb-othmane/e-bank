package ma.ebank.dto.account;

import lombok.Data;

@Data
public class BankAccountDTO {
    private String id;
    private double balance;
    private String type;
    private Long clientId;
}
