package de.deeps.tracking.service;

import de.deeps.tracking.model.Authorization;
import de.deeps.tracking.model.dbobjects.AuthorizationToken;
import de.deeps.tracking.model.dbobjects.Role;
import de.deeps.tracking.model.dbobjects.User;
import de.deeps.tracking.repository.AuthorizationTokensRepository;
import de.deeps.tracking.repository.RoleRepository;
import de.deeps.tracking.repository.UserRepository;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@Getter(AccessLevel.PRIVATE)
@Setter(AccessLevel.PRIVATE)
public class AuthorizationService extends AbstractUserService{


    private AuthorizationTokensRepository authorizationTokensRepository;

    //initialization
    @Autowired
    public AuthorizationService(UserRepository userRepository,
                                AuthorizationTokensRepository authorizationTokensRepository, RoleRepository
                                            roleRepository) {
        super(roleRepository, userRepository);
        setAuthorizationTokensRepository(authorizationTokensRepository);
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
        return getUserRepository().findByEmailAndHashedPassword(email, Authorization.hashPassword(password));
    }

    public String generateAuthenticationToken(String userID) {
        String token = Authorization.generateNewToken();
        getAuthorizationTokensRepository().save(new AuthorizationToken(userID, token));
        return token;
    }

    public boolean isAdmin(String authorizationToken) throws IOException {
        Role role = getRoleByAuthorizationToken(authorizationToken);
        return role.getName().equals(getADMIN_ROLE());
    }

    public boolean isStaff(String authorizationToken) throws IOException {
        Role role = getRoleByAuthorizationToken(authorizationToken);
        return role.getName().equals(getSTAFF_ROLE());
    }

    public void removeAuthorizationToken(String authorizationToken) {
        AuthorizationToken token = getAuthorizationTokensRepository().findByToken(authorizationToken);
        if (token != null) {
            getAuthorizationTokensRepository().delete(token);
        }
    }

    //actions
    private AuthorizationToken getAuthorizationToken(String authorizationToken) {
        AuthorizationToken token = getAuthorizationTokensRepository().findByToken(authorizationToken);
        if (token != null) {
            token = updateExpireDate(token);
        }
        return token;
    }

    private AuthorizationToken updateExpireDate(AuthorizationToken token) {
        token.refreshLastEditTimestamp();
        return getAuthorizationTokensRepository().save(token);
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
