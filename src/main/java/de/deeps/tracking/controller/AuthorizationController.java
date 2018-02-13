package de.deeps.tracking.controller;

import de.deeps.tracking.dto.AuthorizationResponse;
import de.deeps.tracking.service.AuthorizationService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Getter(AccessLevel.PRIVATE) @Setter(AccessLevel.PRIVATE)
public class AuthorizationController {

    private AuthorizationService service;

    @Autowired
    public AuthorizationController(AuthorizationService service){
        setService(service);
    }

    @RequestMapping(value = "/authorize", method = RequestMethod.GET, produces = "application/json")
    public AuthorizationResponse authorize(@RequestParam(value="email") String email, @RequestParam(value="password")
            String password) {
        AuthorizationResponse response = new AuthorizationResponse();
        response.setAuthorized(getService().isAuthorized(email, password));
        if (response.isAuthorized()) {
            response.setAuthorizationToken(getService().generateAuthenticationToken(email));
        }
        return response;
    }

}
