package ma.ebank.controller.account;

import lombok.RequiredArgsConstructor;
import ma.ebank.model.BankAccount;
import ma.ebank.service.interfaces.BankAccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final BankAccountService bankAccountService;

    @PostMapping
    public ResponseEntity<BankAccount> createAccount(
            @RequestParam String rib,
            @RequestParam Long clientId
    ) {
        return ResponseEntity.ok(
                bankAccountService.createAccount(rib, clientId)
        );
    }
}
