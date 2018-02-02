package de.deeps.tracking.controller;

import de.deeps.tracking.dto.AuthorizationResponse;
import de.deeps.tracking.repository.AuthorizationRepository;
import de.deeps.tracking.service.AuthorizationService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Getter(AccessLevel.PRIVATE) @Setter(AccessLevel.PRIVATE)
public class AuthorizationController {

    private AuthorizationService service;

    @Autowired
    public AuthorizationController(AuthorizationService service){
        setService(service);
    }

    @RequestMapping(value = "/authorize", method = RequestMethod.GET, produces = "application/json")
    public AuthorizationResponse shopIDToUrl(@RequestParam(value="email") String email, @RequestParam(value="password")
            String password) {
        boolean isAuthorized = getService().isAuthorized(email, password);

        return new AuthorizationResponse();
    }

}
