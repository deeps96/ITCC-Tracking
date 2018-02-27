package de.deeps.tracking.controller;

import de.deeps.tracking.dto.authorization.AuthorizationResponse;
import de.deeps.tracking.dto.authorization.IsAdminResponse;
import de.deeps.tracking.dto.authorization.IsStaffResponse;
import de.deeps.tracking.model.dbobjects.User;
import de.deeps.tracking.service.AuthorizationService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201"})
@Getter(AccessLevel.PRIVATE) @Setter(AccessLevel.PRIVATE)
public class AuthorizationController extends GenericController {

    @Autowired
    public AuthorizationController(AuthorizationService authorizationService) {
        super(authorizationService);
    }

    @SuppressWarnings("EmptyMethod")
    @RequestMapping(value = "", method = RequestMethod.GET)
    public void ping() {
        //This method is empty, because its only used to check, whether the backend is running or not
    }

    @RequestMapping(value = "/authorize", method = RequestMethod.GET, produces = "application/json")
    public AuthorizationResponse authorize(@RequestParam(value="email") String email, @RequestParam(value="password")
            String password) {
        AuthorizationResponse response = new AuthorizationResponse();
        User user = getAuthorizationService().getAuthorizedUser(email, password);
        response.setAuthorized(user != null);
        if (user != null) {
            response.setAuthorizationToken(getAuthorizationService().generateAuthenticationToken(user.getId()));
        }
        return response;
    }

    @RequestMapping(value = "/logout", method = RequestMethod.DELETE)
    public void logout(@RequestParam(value="authorizationToken") String authorizationToken) {
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
