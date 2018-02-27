package de.deeps.tracking.controller;

import de.deeps.tracking.dto.staffmanagement.AddStaffParameter;
import de.deeps.tracking.dto.staffmanagement.ListStaffResponse;
import de.deeps.tracking.dto.staffmanagement.StaffMember;
import de.deeps.tracking.service.AuthorizationService;
import de.deeps.tracking.service.StaffManagementService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201"})
@Getter(AccessLevel.PRIVATE) @Setter(AccessLevel.PRIVATE)
public class StaffManagementController extends GenericController {

    private StaffManagementService staffManagementService;

    @Autowired
    public StaffManagementController(AuthorizationService authorizationService, StaffManagementService staffManagementService) {
        super(authorizationService);
        setStaffManagementService(staffManagementService);
    }

    @RequestMapping(value = "/addStaff", method = RequestMethod.POST)
    public void addStaff(@RequestBody AddStaffParameter parameter) throws IOException {
        checkPrivilege(parameter, "canAddStaff");
        validateStaffMember(parameter.getStaffMember());
        StaffMember member = parameter.getStaffMember();
        getStaffManagementService().addStaffMember(member.getForeName(), member.getLastName(), member.getDepartment(),
                member.getEmail(), member.getPassword());
    }

    @RequestMapping(value = "/removeStaff", method = RequestMethod.DELETE)
    public void removeStaff(@RequestParam(value="staffID") String staffID, @RequestParam(value="authorizationToken")
            String authorizationToken) throws IOException {
        checkPrivilege(authorizationToken, "canRemoveStaff");
        getStaffManagementService().removeStaffMember(staffID);
    }

    @RequestMapping(value = "/listStaff", method = RequestMethod.GET, produces = "application/json")
    public ListStaffResponse listStaff(@RequestParam(value="authorizationToken") String authorizationToken) throws
            IOException {
        checkPrivilege(authorizationToken, "canListStaff");
        List<StaffMember> staffMembers = getStaffManagementService().getStaff().stream().map(user ->
                new StaffMember(user.getForename(), user.getLastname(), user.getEmail(), user.getId(), user.getDepartment())
        ).collect(Collectors.toList());
        return new ListStaffResponse(staffMembers);
    }

    //validation
    private void validateStaffMember(StaffMember staffMember) throws IOException{
        validateInputNotBlank(staffMember.getDepartment(), staffMember.getEmail(), staffMember.getForeName(),
                staffMember.getLastName(), staffMember.getPassword());
    }
}
