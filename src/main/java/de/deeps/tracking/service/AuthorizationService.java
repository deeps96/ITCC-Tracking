package de.deeps.tracking.service;

import de.deeps.tracking.model.Authorization;
import de.deeps.tracking.model.dbobjects.Role;
import de.deeps.tracking.model.dbobjects.User;
import de.deeps.tracking.model.dbobjects.AuthorizationToken;
import de.deeps.tracking.repository.RoleRepository;
import de.deeps.tracking.repository.UserRepository;
import de.deeps.tracking.repository.AuthorizationTokensRepository;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@Getter(AccessLevel.PRIVATE)
@Setter(AccessLevel.PRIVATE)
public class AuthorizationService {

    private AuthorizationTokensRepository authorizationTokensRepository;
    private RoleRepository roleRepository;
    private UserRepository userRepository;

    //initialization
    @Autowired
    public AuthorizationService(UserRepository userRepository,
                                AuthorizationTokensRepository authorizationTokensRepository, RoleRepository
                                            roleRepository) {
        setUserRepository(userRepository);
        setAuthorizationTokensRepository(authorizationTokensRepository);
        setRoleRepository(roleRepository);
    }

    //convenience
    public boolean hasPrivileges(String token, List<String> privileges) throws IOException {
        Role role = getRoleByAuthorizationToken(token);
        if (role == null) {
            throw new IOException("Internal error - role is not set!");
        }
        return role.getPrivileges() != null && role.getPrivileges().containsAll(privileges);
    }

    public User getAuthorizedUser(String email, String password) {
        User user = getUserRepository().findByEmail(email);
        return (Authorization.isAuthorized(user, password)) ? user : null;
    }

    public String generateAuthenticationToken(String userID) {
        String token = Authorization.generateNewToken();
        getAuthorizationTokensRepository().save(new AuthorizationToken(userID, token));
        return token;
    }

    //actions
    private AuthorizationToken getAuthorizationToken(String authorizationToken) {
        AuthorizationToken token = getAuthorizationTokensRepository().findByToken(authorizationToken);
        if (token != null) {
            updateExpireDate(token);
        }
        return token;
    }

    private void updateExpireDate(AuthorizationToken token) {
        token.refreshLastEditTimestamp();
        getAuthorizationTokensRepository().save(token);
    }

    private Role getRoleByAuthorizationToken(String authorizationToken) throws IOException {
        AuthorizationToken token = getAuthorizationToken(authorizationToken);
        if (token == null) {
            throw new IOException("Authorization token expired");
        }
        User user = getUserRepository().findOne(token.getUserID());
        return getRoleRepository().findOne(user.getRoleID());
    }

}
