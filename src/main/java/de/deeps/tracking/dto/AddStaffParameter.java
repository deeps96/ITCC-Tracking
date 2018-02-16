package de.deeps.tracking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddStaffParameter extends AuthorizationParameter{

    private StaffMember staffMember;
}
