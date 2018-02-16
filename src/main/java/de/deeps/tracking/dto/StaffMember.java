package de.deeps.tracking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StaffMember {

    private String department, email, foreName, id, lastName, password;

    public StaffMember(String foreName, String lastName, String email, String id, String department) {
       setForeName(foreName);
       setLastName(lastName);
       setEmail(email);
       setId(id);
       setDepartment(department);
    }
}
