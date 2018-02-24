package de.deeps.tracking.controller;

import de.deeps.tracking.dto.authorization.AuthorizationParameter;
import de.deeps.tracking.model.data.Location;
import de.deeps.tracking.service.AuthorizationService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;
import java.util.Arrays;

@Getter(AccessLevel.PROTECTED) @Setter(AccessLevel.PRIVATE)
public abstract class GenericController {

    private AuthorizationService authorizationService;

    public GenericController(AuthorizationService authorizationService) {
        setAuthorizationService(authorizationService);
    }

    protected void checkPrivilege(AuthorizationParameter parameter, String... privileges) throws IOException {
        checkPrivilege(parameter.getAuthorizationToken(), privileges);
    }

    protected void checkPrivilege(String authorizationToken, String... privileges) throws IOException {
        if (!getAuthorizationService().hasPrivileges(authorizationToken, Arrays.asList(privileges))) {
            throw new IOException("Not enough privileges!");
        }
    }

    protected void validateInputNotBlank(String... inputs) throws IOException {
        for (String input : inputs) {
            if (input == null || input.replace(" ", "").isEmpty()){
                throw new IOException("A parameter is missing!");
            }
        }
    }

    protected void validateLocation(Location location) throws IOException {
        validateInputNotBlank(location.getCountry(), location.getRoad(), location.getCity().getZipCode(), location
                .getCity().getName());
    }
}
