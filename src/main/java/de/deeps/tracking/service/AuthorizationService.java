package de.deeps.tracking.service;

import de.deeps.tracking.model.AuthorizationEntry;
import de.deeps.tracking.repository.AuthorizationRepository;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Getter(AccessLevel.PRIVATE) @Setter(AccessLevel.PRIVATE)
public class AuthorizationService {

    private AuthorizationRepository authorizationRepository;

    @Autowired
    public AuthorizationService(AuthorizationRepository authorizationRepository) {
        setAuthorizationRepository(authorizationRepository);
    }

    public boolean isAuthorized(String email, String password) {
        return false;
    }
}
