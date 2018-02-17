package de.deeps.tracking.controller;

import de.deeps.tracking.dto.*;
import de.deeps.tracking.model.dbobjects.User;
import de.deeps.tracking.service.AuthorizationService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Getter(AccessLevel.PRIVATE) @Setter(AccessLevel.PRIVATE)
public class AuthorizationController extends GenericController {

    @Autowired
    public AuthorizationController(AuthorizationService authorizationService) {
        super(authorizationService);
    }

    @RequestMapping(value = "/authorize", method = RequestMethod.GET, produces = "application/json")
    public AuthorizationResponse authorize(@RequestParam(value="email") String email, @RequestParam(value="password")
            String password) {
        AuthorizationResponse response = new AuthorizationResponse();
        User user = getAuthorizationService().getAuthorizedUser(email, password);
        response.setAuthorized(user != null);
        if (response.isAuthorized()) {
            response.setAuthorizationToken(getAuthorizationService().generateAuthenticationToken(user.getId()));
        }
        return response;
    }

    @RequestMapping(value = "/logout", method = RequestMethod.DELETE)
    public void logout(@RequestParam(value="authorizationToken")
            String authorizationToken) {
        getAuthorizationService().removeAuthorizationToken(authorizationToken);
    }

    @RequestMapping(value = "/isAdmin", method = RequestMethod.GET, produces = "application/json")
    public IsAdminResponse isAdmin(@RequestParam(value="authorizationToken") String authorizationToken) throws
            IOException {
        return new IsAdminResponse(getAuthorizationService().isAdmin(authorizationToken));
    }

    @RequestMapping(value = "/isStaff", method = RequestMethod.GET, produces = "application/json")
    public IsStaffResponse isStaff(@RequestParam(value="authorizationToken") String authorizationToken) throws
            IOException {
        return new IsStaffResponse(getAuthorizationService().isStaff(authorizationToken));
    }

}
