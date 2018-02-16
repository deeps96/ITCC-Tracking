package de.deeps.tracking.controller;

import de.deeps.tracking.dto.*;
import de.deeps.tracking.model.Authorization;
import de.deeps.tracking.model.dbobjects.User;
import de.deeps.tracking.service.AuthorizationService;
import de.deeps.tracking.service.ParcelManagementService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Getter(AccessLevel.PRIVATE) @Setter(AccessLevel.PRIVATE)
public class ParcelManagementController extends GenericController {

    private ParcelManagementService parcelManagementService;

    @Autowired
    public ParcelManagementController(AuthorizationService authorizationService, ParcelManagementService parcelManagementService){
        setParcelManagementService(parcelManagementService);
    }

    @RequestMapping(value = "/createParcel", method = RequestMethod.POST,  produces = "application/json")
    public CreateParcelResponse createParcel(@RequestBody CreateParcelParameter parameter) throws IOException {
        String trackingNumber = getParcelManagementService().createParcel(parameter.getParcelTypeName(), parameter.getDeparture(),
                parameter.getDestination(), parameter.getHandOverTimestamp());
        if (trackingNumber == null) {
            throw new IOException("Required parameter missing!");
        }
        return new CreateParcelResponse(trackingNumber);
    }

    @RequestMapping(value = "/addStation", method = RequestMethod.PATCH)
    public void addStation(@RequestBody AddStationParameter parameter) throws IOException {
        checkPrivilege(parameter, "canAddStation");
        boolean success = getParcelManagementService().addStationToParcel(parameter.getTrackingNumber(), parameter.getStation());
        if (!success) {
            throw new IOException("Error while adding station to " + parameter.getTrackingNumber());
        }
    }

    @RequestMapping(value = "/listParcelTypes", method = RequestMethod.GET, produces = "application/json")
    public ListParcelTypesResponse listParcelTypes() {
        List<String> parcelTypes = getParcelManagementService().getParcelTypes();
        return new ListParcelTypesResponse(parcelTypes);
    }

    @RequestMapping(value = "/listTransportationModes", method = RequestMethod.GET, produces = "application/json")
    public ListTransportationModesResponse listTransportationModes() {
        List<String> transportationModes = getParcelManagementService().getTransportationModes();
        return new ListTransportationModesResponse(transportationModes);
    }

    @RequestMapping(value = "/listActionDescriptions", method = RequestMethod.GET, produces = "application/json")
    public ListActionDescriptionsResponse listActionDescriptions() {
        List<String> actionDescriptions = getParcelManagementService().getActionDescriptions();
        return new ListActionDescriptionsResponse(actionDescriptions);
    }
}
