package ma.ebank.controller.transaction;

import lombok.RequiredArgsConstructor;
import ma.ebank.service.interfaces.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(
            @RequestBody Map<String, Object> request,
            Principal principal
    ) {

        String ribFrom = (String) request.get("ribFrom");
        String ribTo = (String) request.get("ribTo");
        Double amount = Double.valueOf(request.get("amount").toString());

        transactionService.transfer(
                ribFrom,
                ribTo,
                amount,
                principal.getName()
        );

        return ResponseEntity.ok(
                Map.of("message", "Virement effectué avec succès")
        );
    }
}
