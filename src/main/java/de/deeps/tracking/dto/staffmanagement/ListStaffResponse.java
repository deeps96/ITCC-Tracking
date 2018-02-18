package de.deeps.tracking.dto.staffmanagement;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ListStaffResponse {

    private List<StaffMember> staffMembers;

    public ListStaffResponse(List<StaffMember> staffMembers) {
        setStaffMembers(staffMembers);
    }
}
