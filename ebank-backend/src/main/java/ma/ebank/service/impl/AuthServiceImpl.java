package ma.ebank.service.impl;

import lombok.RequiredArgsConstructor;
import ma.ebank.dao.UserRepository;
import ma.ebank.dto.auth.LoginResponse;
import ma.ebank.model.User;
import ma.ebank.service.interfaces.AuthService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Login ou mot de passe erronés"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Login ou mot de passe erronés");
        }
        return user;
    }

    @Override
    public void changePassword(String username, String oldPassword, String newPassword) {
        User user = authenticate(username, oldPassword);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
