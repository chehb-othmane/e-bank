package ma.ebank.controller.auth;

import lombok.RequiredArgsConstructor;
import ma.ebank.dto.auth.LoginRequest;
import ma.ebank.dto.auth.LoginResponse;
import ma.ebank.service.interfaces.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")  // Extra safety for this specific controller
public class AuthController {
    
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(
                request.getUsername(),
                request.getPassword()
        );
        return ResponseEntity.ok(response);
    }
}