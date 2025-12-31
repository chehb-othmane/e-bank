package ma.ebank.service.impl;

import lombok.RequiredArgsConstructor;
import ma.ebank.dao.ClientRepository;
import ma.ebank.dto.client.ClientDTO;
import ma.ebank.exception.BusinessException;
import ma.ebank.model.Client;
import ma.ebank.service.interfaces.ClientService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public ClientDTO createClient(ClientDTO clientDTO) {

        // RG_4: Le numéro d'identité doit être unique
        clientRepository.findByIdentityNumber(clientDTO.getIdentityNumber())
                .ifPresent(c -> {
                    throw new BusinessException("Numéro d'identité déjà existant");
                });

        // RG_6: L'adresse mail doit être unique
        clientRepository.findByEmail(clientDTO.getEmail())
                .ifPresent(c -> {
                    throw new BusinessException("Email déjà existant");
                });

        Client client = modelMapper.map(clientDTO, Client.class);
        
        // Generate username and password for the client
        String username = generateUsername(clientDTO.getFirstname(), clientDTO.getLastname());
        String generatedPassword = generatePassword();
        
        client.setUsername(username);
        client.setPassword(passwordEncoder.encode(generatedPassword));
        client.setRole("CLIENT");
        
        Client saved = clientRepository.save(client);

        // RG_7: Send email to client with login and password
        sendCredentialsEmail(saved.getEmail(), username, generatedPassword);

        return modelMapper.map(saved, ClientDTO.class);
    }

    private String generateUsername(String firstname, String lastname) {
        // Generate username from firstname.lastname
        String baseUsername = firstname.toLowerCase() + "." + lastname.toLowerCase();
        String username = baseUsername;
        int counter = 1;
        
        // Check if username exists and add counter if needed
        while (clientRepository.findByUsername(username).isPresent()) {
            username = baseUsername + counter;
            counter++;
        }
        
        return username;
    }

    private String generatePassword() {
        // Generate random password (8 characters)
        return UUID.randomUUID().toString().substring(0, 8);
    }

    private void sendCredentialsEmail(String email, String username, String password) {
        // RG_7: Implementation for sending email
        // This is a placeholder - in production, use JavaMailSender
        System.out.println("=================================");
        System.out.println("Email sent to: " + email);
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        System.out.println("=================================");
        
        
        /*
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Vos identifiants eBank");
        message.setText("Bonjour,\n\nVoici vos identifiants de connexion:\n" +
                       "Username: " + username + "\n" +
                       "Password: " + password + "\n\n" +
                       "Cordialement,\neBank");
        mailSender.send(message);
        */
    }
}