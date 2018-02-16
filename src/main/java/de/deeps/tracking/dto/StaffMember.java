package de.deeps.tracking.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.NotBlank;

@Getter
@Setter
public class StaffMember {

    @NotBlank
    private String department, email, foreName, id, lastName;
    private String password;

    public StaffMember(){}

    public StaffMember(String foreName, String lastName, String email, String id, String department) {
       setForeName(foreName);
       setLastName(lastName);
       setEmail(email);
       setId(id);
       setDepartment(department);
    }
}
