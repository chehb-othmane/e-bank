package ma.ebank.service.impl;

import lombok.RequiredArgsConstructor;
import ma.ebank.dao.BankAccountRepository;
import ma.ebank.dao.TransactionRepository;
import ma.ebank.enums.AccountStatus;
import ma.ebank.enums.TransactionType;
import ma.ebank.model.BankAccount;
import ma.ebank.model.Transaction;
import ma.ebank.model.User;
import ma.ebank.service.interfaces.TransactionService;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final BankAccountRepository bankAccountRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public void transfer(String ribFrom, String ribTo, Double amount, String username) {

        BankAccount from = bankAccountRepository.findByRib(ribFrom)
                .orElseThrow(() -> new RuntimeException("Compte source introuvable"));

        BankAccount to = bankAccountRepository.findByRib(ribTo)
                .orElseThrow(() -> new RuntimeException("Compte destinataire introuvable"));

        if (from.getStatus() != AccountStatus.OPENED) {
            throw new RuntimeException("Compte bloqué ou clôturé");
        }

        if (from.getBalance() < amount) {
            throw new RuntimeException("Solde insuffisant");
        }

        from.setBalance(from.getBalance() - amount);
        to.setBalance(to.getBalance() + amount);

        Transaction debit = new Transaction();
        debit.setDate(new Date());
        debit.setType(TransactionType.DEBIT);
        debit.setAmount(amount);
        debit.setBankAccount(from);
        debit.setDescription("Virement vers " + ribTo);

        Transaction credit = new Transaction();
        credit.setDate(new Date());
        credit.setType(TransactionType.CREDIT);
        credit.setAmount(amount);
        credit.setBankAccount(to);
        credit.setDescription("Virement de " + ribFrom);

        transactionRepository.save(debit);
        transactionRepository.save(credit);

        bankAccountRepository.save(from);
        bankAccountRepository.save(to);
    }
}
