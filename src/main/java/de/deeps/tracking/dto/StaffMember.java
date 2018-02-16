package de.deeps.tracking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StaffMember {

    private String foreName, lastName, email, id;

    public StaffMember(String foreName, String lastName, String email, String id) {
       setForeName(foreName);
       setLastName(lastName);
       setEmail(email);
       setId(id);
    }
}
