package de.deeps.tracking.service;

import de.deeps.tracking.model.Authorization;
import de.deeps.tracking.model.dbobjects.AuthorizationEntry;
import de.deeps.tracking.model.dbobjects.AuthorizationToken;
import de.deeps.tracking.repository.AuthorizationEntriesRepository;
import de.deeps.tracking.repository.AuthorizationTokensRepository;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Getter(AccessLevel.PRIVATE)
@Setter(AccessLevel.PRIVATE)
public class AuthorizationService {

    private AuthorizationEntriesRepository authorizationEntriesRepository;
    private AuthorizationTokensRepository authorizationTokensRepository;

    //initialization
    @Autowired
    public AuthorizationService(AuthorizationEntriesRepository authorizationEntriesRepository,
                                AuthorizationTokensRepository authorizationTokensRepository) {
        setAuthorizationEntriesRepository(authorizationEntriesRepository);
        setAuthorizationTokensRepository(authorizationTokensRepository);
    }

    //convenience
    public boolean isAuthorized(String email, String password) {
        AuthorizationEntry entry = getAuthorizationEntriesRepository().findByEmail(email);
        return Authorization.isAuthorized(entry, password);
    }

    public String generateAuthenticationToken(String email) {
        String token = Authorization.generateNewToken();
        getAuthorizationTokensRepository().save(new AuthorizationToken(email, token));
        return token;
    }

}
