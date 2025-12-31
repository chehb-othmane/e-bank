package ma.ebank.service.interfaces;

import ma.ebank.model.BankAccount;

public interface BankAccountService {

    BankAccount createAccount(String rib, Long clientId);
}
