package de.deeps.tracking.service;

import de.deeps.tracking.repository.RoleRepository;
import de.deeps.tracking.repository.UserRepository;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Getter(AccessLevel.PROTECTED)
@Setter(AccessLevel.PRIVATE)
public abstract class AbstractUserService {

    @Getter(AccessLevel.PROTECTED) private static final String STAFF_ROLE = "Staff", ADMIN_ROLE = "Admin";

    private RoleRepository roleRepository;
    private UserRepository userRepository;

    public AbstractUserService(RoleRepository roleRepository, UserRepository userRepository) {
        setRoleRepository(roleRepository);
        setUserRepository(userRepository);
    }
}
