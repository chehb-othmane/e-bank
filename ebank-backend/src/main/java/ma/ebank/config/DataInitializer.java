package ma.ebank.config;

import ma.ebank.dao.UserRepository;
import ma.ebank.model.User;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(
            UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder
    ) {
        return args -> {

            if (userRepository.findByUsername("agent1").isEmpty()) {

                User user = new User();
                user.setUsername("agent1");
                user.setPassword(passwordEncoder.encode("1234"));
                user.setFirstname("Agent");
                user.setLastname("Ebank");
                user.setEmail("agent1@ebank.com");
                user.setRole("AGENT_GUICHET");

                user.setEnabled(true);
                user.setAccountNonExpired(true);
                user.setAccountNonLocked(true);
                user.setCredentialsNonExpired(true);

                userRepository.save(user);

                System.out.println("Default user 'agent1' created with role AGENT_GUICHET");
            } else {
                System.out.println("User 'agent1' already exists");
            }
        };
    }
}