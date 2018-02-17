package de.deeps.tracking.controller;

import de.deeps.tracking.dto.*;
import de.deeps.tracking.model.dbobjects.ActionDescription;
import de.deeps.tracking.model.dbobjects.ParcelType;
import de.deeps.tracking.model.dbobjects.TransportationMode;
import de.deeps.tracking.service.AuthorizationService;
import de.deeps.tracking.service.ParcelManagementService;
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
public class ParcelManagementController extends GenericController {

    private ParcelManagementService parcelManagementService;

    @Autowired
    public ParcelManagementController(AuthorizationService authorizationService, ParcelManagementService parcelManagementService){
        super(authorizationService);
        setParcelManagementService(parcelManagementService);
    }

    @RequestMapping(value = "/createParcel", method = RequestMethod.POST,  produces = "application/json")
    public CreateParcelResponse createParcel(@RequestBody CreateParcelParameter parameter) throws IOException {
        Parcel parcel = parameter.getParcel();
        String trackingNumber = getParcelManagementService().createParcel(parcel.getParcelTypeName(), parcel.getDeparture(),
                parcel.getDestination(), parcel.getHandOverTimestamp());
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
        List<String> parcelTypes = getParcelManagementService().getParcelTypes().stream().map(ParcelType::getName)
                .collect(Collectors.toList());
        return new ListParcelTypesResponse(parcelTypes);
    }

    @RequestMapping(value = "/listTransportationModes", method = RequestMethod.GET, produces = "application/json")
    public ListTransportationModesResponse listTransportationModes() {
        List<String> transportationModes = getParcelManagementService().getTransportationModes().stream().map(
                TransportationMode::getMode).collect(Collectors.toList());
        return new ListTransportationModesResponse(transportationModes);
    }

    @RequestMapping(value = "/listActionDescriptions", method = RequestMethod.GET, produces = "application/json")
    public ListActionDescriptionsResponse listActionDescriptions() {
        List<String> actionDescriptions = getParcelManagementService().getActionDescriptions().stream().map
                (ActionDescription::getAction).collect(Collectors.toList());
        return new ListActionDescriptionsResponse(actionDescriptions);
    }

    @RequestMapping(value = "/getParcel", method = RequestMethod.GET, produces = "application/json")
    public GetParcelResponse getParcel(@RequestParam(value="trackingNumber") String trackingNumber) throws IOException {
        return new GetParcelResponse(getParcelManagementService().getParcel(trackingNumber));
    }

}
