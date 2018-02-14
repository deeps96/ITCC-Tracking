package de.deeps.tracking.controller;

import de.deeps.tracking.dto.CreateParcelParameter;
import de.deeps.tracking.dto.CreateParcelResponse;
import de.deeps.tracking.service.ParcelManagementService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Getter(AccessLevel.PRIVATE) @Setter(AccessLevel.PRIVATE)
public class ParcelManagementController {

    private ParcelManagementService service;

    @Autowired
    public ParcelManagementController(ParcelManagementService service){
        setService(service);
    }

    @RequestMapping(value = "/createParcel", method = RequestMethod.POST,  produces = "application/json")
    public CreateParcelResponse createParcel(@RequestBody CreateParcelParameter parameter){
        String trackingNumber = getService().createParcel(parameter.getParcelTypeName(), parameter.getDeparture(),
                parameter.getDestination(), parameter.getHandOverTimestamp());
        return new CreateParcelResponse(trackingNumber);
    }
}
