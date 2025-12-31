package ma.ebank.service.impl;

import lombok.RequiredArgsConstructor;
import ma.ebank.dao.BankAccountRepository;
import ma.ebank.dao.TransactionRepository;
import ma.ebank.enums.AccountStatus;
import ma.ebank.enums.TransactionType;
import ma.ebank.model.BankAccount;
import ma.ebank.model.Transaction;
import ma.ebank.service.interfaces.TransactionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final BankAccountRepository bankAccountRepository;
    private final TransactionRepository transactionRepository;

    @Override
    @Transactional
    public void transfer(String ribFrom, String ribTo, Double amount, String username) {

        BankAccount from = bankAccountRepository.findByRib(ribFrom)
                .orElseThrow(() -> new RuntimeException("Compte source introuvable"));

        BankAccount to = bankAccountRepository.findByRib(ribTo)
                .orElseThrow(() -> new RuntimeException("Compte destinataire introuvable"));

        // RG_11: Le compte bancaire ne doit pas être bloqué ou clôturé
        if (from.getStatus() != AccountStatus.OPENED) {
            throw new RuntimeException("Compte bloqué ou clôturé");
        }

        // RG_12: Le solde de compte doit être supérieur au montant du virement
        if (from.getBalance() < amount) {
            throw new RuntimeException("Solde insuffisant");
        }

        // RG_13: Le compte du client sera débité du montant du virement
        from.setBalance(from.getBalance() - amount);
        
        // RG_14: Le compte du client destinataire sera crédité du montant du virement
        to.setBalance(to.getBalance() + amount);

        // RG_15: L'application doit tracer les deux opérations avec leurs dates précises
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