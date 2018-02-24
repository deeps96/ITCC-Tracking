package de.deeps.tracking.service;

import de.deeps.tracking.model.Authorization;
import de.deeps.tracking.model.dbobjects.Role;
import de.deeps.tracking.model.dbobjects.User;
import de.deeps.tracking.repository.RoleRepository;
import de.deeps.tracking.repository.UserRepository;
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
public class StaffManagementService extends AbstractUserService{

    @Autowired
    public StaffManagementService(UserRepository userRepository, RoleRepository roleRepository) {
        super(roleRepository, userRepository);
    }

    public List<User> getStaff() throws IOException {
        Role staffRole = getRoleRepository().findByName(getSTAFF_ROLE());
        if (staffRole == null) {
            throw new IOException("Internal server error - Role " + getSTAFF_ROLE() + " does not exist");
        }
        return getUserRepository().findByRoleID(staffRole.getId());
    }

    public void addStaffMember(String forename, String lastname, String department, String email, String password) throws IOException {
        Role role = getRoleRepository().findByName(getSTAFF_ROLE());
        if (role == null) { throw new IOException("Role unknown"); }
        User newStaff = new User(department, email, password, forename, lastname);
        newStaff.setHashedPassword(Authorization.hashPassword(password));
        newStaff.setRoleID(role.getId());
        getUserRepository().save(newStaff);
    }

    public void removeStaffMember(String staffID) throws IOException {
        if (getUserRepository().findOne(staffID) == null) { throw new IOException("Staff does not exists"); }
        getUserRepository().delete(staffID);
    }

}
