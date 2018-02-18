package de.deeps.tracking.dto.staffmanagement;

import de.deeps.tracking.dto.authorization.AuthorizationParameter;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddStaffParameter extends AuthorizationParameter {

    private StaffMember staffMember;
}
