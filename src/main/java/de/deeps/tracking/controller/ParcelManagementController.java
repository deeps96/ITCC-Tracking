package de.deeps.tracking.controller;

import de.deeps.tracking.dto.AddStationParameter;
import de.deeps.tracking.dto.AuthorizationParameter;
import de.deeps.tracking.dto.CreateParcelParameter;
import de.deeps.tracking.dto.CreateParcelResponse;
import de.deeps.tracking.model.Authorization;
import de.deeps.tracking.service.AuthorizationService;
import de.deeps.tracking.service.ParcelManagementService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Arrays;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Getter(AccessLevel.PRIVATE) @Setter(AccessLevel.PRIVATE)
public class ParcelManagementController {

    private AuthorizationService authorizationService;
    private ParcelManagementService parcelManagementService;

    @Autowired
    public ParcelManagementController(AuthorizationService authorizationService, ParcelManagementService parcelManagementService){
        setAuthorizationService(authorizationService);
        setParcelManagementService(parcelManagementService);
    }

    @RequestMapping(value = "/createParcel", method = RequestMethod.POST,  produces = "application/json")
    public CreateParcelResponse createParcel(@RequestBody CreateParcelParameter parameter){
        String trackingNumber = getParcelManagementService().createParcel(parameter.getParcelTypeName(), parameter.getDeparture(),
                parameter.getDestination(), parameter.getHandOverTimestamp());
        return new CreateParcelResponse(trackingNumber);
    }

    @RequestMapping(value = "/addStation", method = RequestMethod.POST)
    public void addStation(@RequestBody AddStationParameter parameter) throws IOException {
        checkPrivilege(parameter, "canAddStation");
        boolean success = getParcelManagementService().addStationToParcel(parameter.getTrackingNumber(), parameter.getStation());
        if (!success) {
            throw new IOException("Error while adding station to " + parameter.getTrackingNumber());
        }
    }

    private void checkPrivilege(AuthorizationParameter parameter, String... privileges) throws IOException {
        if (!getAuthorizationService().hasPrivileges(parameter.getAccessToken(), Arrays.asList(privileges))) {
            throw new IOException("Not enough privileges!");
        }
    }
}
