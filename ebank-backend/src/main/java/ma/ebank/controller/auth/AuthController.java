package ma.ebank.controller.auth;

import lombok.RequiredArgsConstructor;
import ma.ebank.jwt.JwtUtils;
import ma.ebank.model.User;
import ma.ebank.service.interfaces.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ma.ebank.dto.auth.LoginRequest;
import ma.ebank.dto.auth.LoginResponse;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
        @RequestBody LoginRequest request
) {
    LoginResponse response = authService.login(
            request.getUsername(),
            request.getPassword()
    );
    return ResponseEntity.ok(response);
}
}

