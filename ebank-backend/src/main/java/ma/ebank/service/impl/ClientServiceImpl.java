package ma.ebank.service.impl;

import lombok.RequiredArgsConstructor;
import ma.ebank.dao.ClientRepository;
import ma.ebank.dto.client.ClientDTO;
import ma.ebank.exception.BusinessException;
import ma.ebank.model.Client;
import ma.ebank.service.interfaces.ClientService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final ModelMapper modelMapper;

    @Override
    public ClientDTO createClient(ClientDTO clientDTO) {

        clientRepository.findByIdentityNumber(clientDTO.getIdentityNumber())
                .ifPresent(c -> {
                    throw new BusinessException("Numéro d’identité déjà existant");
                });

        clientRepository.findByEmail(clientDTO.getEmail())
                .ifPresent(c -> {
                    throw new BusinessException("Email déjà existant");
                });

        Client client = modelMapper.map(clientDTO, Client.class);
        Client saved = clientRepository.save(client);

        return modelMapper.map(saved, ClientDTO.class);
    }
}
