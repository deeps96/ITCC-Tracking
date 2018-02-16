package de.deeps.tracking.controller;

import de.deeps.tracking.dto.AddStaffParameter;
import de.deeps.tracking.dto.AuthorizationResponse;
import de.deeps.tracking.dto.CreateParcelParameter;
import de.deeps.tracking.dto.CreateParcelResponse;
import de.deeps.tracking.model.dbobjects.User;
import de.deeps.tracking.service.AuthorizationService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Getter(AccessLevel.PRIVATE) @Setter(AccessLevel.PRIVATE)
public class AuthorizationController extends GenericController {

    private AuthorizationService service;

    @Autowired
    public AuthorizationController(AuthorizationService service){
        setService(service);
    }

    @RequestMapping(value = "/authorize", method = RequestMethod.GET, produces = "application/json")
    public AuthorizationResponse authorize(@RequestParam(value="email") String email, @RequestParam(value="password")
            String password) {
        AuthorizationResponse response = new AuthorizationResponse();
        User user = getService().getAuthorizedUser(email, password);
        response.setAuthorized(user != null);
        if (response.isAuthorized()) {
            response.setAuthorizationToken(getService().generateAuthenticationToken(user.getId()));
        }
        return response;
    }

    @RequestMapping(value = "/addStaff", method = RequestMethod.POST)
    public void addStaff(@RequestBody AddStaffParameter parameter) throws IOException {
        checkPrivilege(parameter, "canAddStaff");
        getService().addStaffMember(parameter.getForename(), parameter.getLastname(), parameter.getDepartment(),
                parameter.getEmail(), parameter.getPassword(), parameter.getRole());
    }

}
