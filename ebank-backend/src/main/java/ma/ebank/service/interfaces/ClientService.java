package ma.ebank.service.interfaces;

import ma.ebank.dto.client.ClientDTO;
import java.util.List;

public interface ClientService {
    ClientDTO createClient(ClientDTO clientDTO);
    List<ClientDTO> getAllClients();
    ClientDTO getClientById(Long id);
}