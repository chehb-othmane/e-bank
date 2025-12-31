package ma.ebank.service.interfaces;

import ma.ebank.dto.auth.LoginResponse;

public interface AuthService {

    LoginResponse login(String username, String password);

    void changePassword(String username, String oldPassword, String newPassword);
}