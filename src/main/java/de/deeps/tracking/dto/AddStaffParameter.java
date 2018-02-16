package de.deeps.tracking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddStaffParameter extends AuthorizationParameter{

    private String forename, lastname, department, email, password, role;
}
