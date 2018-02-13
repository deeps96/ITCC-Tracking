package de.deeps.tracking.service;

import com.google.common.hash.Hashing;
import de.deeps.tracking.model.dbobjects.AuthorizationEntry;
import de.deeps.tracking.model.dbobjects.AuthorizationToken;
import de.deeps.tracking.repository.AuthorizationEntriesRepository;
import de.deeps.tracking.repository.AuthorizationTokensRepository;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

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
        return isAuthorized(entry, password);
    }

    public String generateAuthenticationToken(String email) {
        String token = generateNewToken();
        storeAuthentificationToken(email, token);
        return token;
    }

    //actions
    private String hashPassword(String rawPassword) {
        return Hashing.sha256().hashString(rawPassword, StandardCharsets.UTF_8).toString();
    }

    private String generateNewToken() {
        return UUID.randomUUID().toString();
    }

    private void storeAuthentificationToken(String email, String token) {
        getAuthorizationTokensRepository().save(new AuthorizationToken(email, token));
    }

    //conditionals
    private boolean isAuthorized(AuthorizationEntry entry, String password) {
        return entry != null && entry.getHashedPassword().equals(hashPassword(password));
    }

}
