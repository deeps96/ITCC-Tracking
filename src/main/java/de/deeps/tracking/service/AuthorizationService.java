package de.deeps.tracking.service;

import de.deeps.tracking.dto.StaffMember;
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

    @Getter(AccessLevel.PRIVATE) private static final String STAFF_ROLE = "Staff";

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
        return getUserRepository().findByEmailAndHashedPassword(email, Authorization.hashPassword(password));
    }

    public void addStaffMember(String forename, String lastname, String department, String email, String password,
                               String roleName) throws IOException {
        Role role = getRoleRepository().findByName(roleName);
        if (role == null) {
            throw new IOException("Role unkown");
        }
        User newStaff = new User(forename, lastname, department, email, password);
        newStaff.setRoleID(role.getId());
        getUserRepository().save(newStaff);
    }

    public String generateAuthenticationToken(String userID) {
        String token = Authorization.generateNewToken();
        getAuthorizationTokensRepository().save(new AuthorizationToken(userID, token));
        return token;
    }

    public void removeStaffMember(String staffID) throws IOException {
        if (getUserRepository().findOne(staffID) != null) {
            throw new IOException("Staff does not exists");
        }
        getUserRepository().delete(staffID);
    }

    public List<User> getStaff() throws IOException {
        Role staffRole = getRoleRepository().findByName(getSTAFF_ROLE());
        if (staffRole == null) {
            throw new IOException("Internal server error - Role " + getSTAFF_ROLE() + " does not exist");
        }
        return getUserRepository().findByRoleID(staffRole.getId());
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
