package de.deeps.tracking.controller;

import de.deeps.tracking.dto.AuthorizationParameter;
import de.deeps.tracking.service.AuthorizationService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Arrays;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Getter(AccessLevel.PRIVATE) @Setter(AccessLevel.PRIVATE)
public abstract class GenericController {

    private AuthorizationService authorizationService;

    @Autowired
    public GenericController() {
        setAuthorizationService(authorizationService);
    }

    protected void checkPrivilege(AuthorizationParameter parameter, String... privileges) throws IOException {
        if (!getAuthorizationService().hasPrivileges(parameter.getAuthorizationToken(), Arrays.asList(privileges))) {
            throw new IOException("Not enough privileges!");
        }
    }
}
