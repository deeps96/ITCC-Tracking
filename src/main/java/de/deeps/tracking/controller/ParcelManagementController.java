package de.deeps.tracking.controller;

import de.deeps.tracking.dto.*;
import de.deeps.tracking.service.AuthorizationService;
import de.deeps.tracking.service.ParcelManagementService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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
                parcel.getDestination(), parcel.getHandOverTimestamp(), parcel.getDeparturePersonDetails(), parcel
                        .getDestinationPersonDetails());
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

    @RequestMapping(value = "/getParcel", method = RequestMethod.GET, produces = "application/json")
    public GetParcelResponse getParcel(@RequestParam(value="trackingNumber") String trackingNumber) throws IOException {
        return new GetParcelResponse(getParcelManagementService().getParcel(trackingNumber));
    }

}
