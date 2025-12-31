package ma.ebank.service.impl;

import lombok.RequiredArgsConstructor;
import ma.ebank.dao.UserRepository;
import ma.ebank.dto.auth.LoginResponse;
import ma.ebank.jwt.JwtUtils;
import ma.ebank.model.User;
import ma.ebank.service.interfaces.AuthService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Override
    public LoginResponse login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Login ou mot de passe erronés"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Login ou mot de passe erronés");
        }

        String token = jwtUtils.generateToken(username);
        String role = user.getRole();

        return new LoginResponse(token, username, role);
    }

    @Override
    public void changePassword(String username, String oldPassword, String newPassword) {
        // Authenticate with old password first
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Login ou mot de passe erronés"));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Login ou mot de passe erronés");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}