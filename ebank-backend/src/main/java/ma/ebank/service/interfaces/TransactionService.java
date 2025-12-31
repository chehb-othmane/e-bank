package ma.ebank.service.interfaces;

public interface TransactionService {

    void transfer(String ribFrom, String ribTo, Double amount, String username);
}
