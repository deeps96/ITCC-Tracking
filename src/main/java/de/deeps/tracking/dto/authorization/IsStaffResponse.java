package de.deeps.tracking.dto.authorization;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IsStaffResponse {

    private boolean staff;

    public IsStaffResponse(boolean staff) {
        setStaff(staff);
    }
}
