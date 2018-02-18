package de.deeps.tracking.controller;

import de.deeps.tracking.dto.ListActionDescriptionsResponse;
import de.deeps.tracking.dto.ListParcelTypesResponse;
import de.deeps.tracking.dto.ListTransportationModesResponse;
import de.deeps.tracking.model.dbobjects.ActionDescription;
import de.deeps.tracking.model.dbobjects.ParcelType;
import de.deeps.tracking.model.dbobjects.TransportationMode;
import de.deeps.tracking.service.AuthorizationService;
import de.deeps.tracking.service.FixedDataService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Getter(AccessLevel.PRIVATE) @Setter(AccessLevel.PRIVATE)
public class FixedDataController extends GenericController {

    private FixedDataService fixedDataService;

    @Autowired
    public FixedDataController(AuthorizationService authorizationService, FixedDataService fixedDataService){
        super(authorizationService);
        setFixedDataService(fixedDataService);
    }

    @RequestMapping(value = "/listParcelTypes", method = RequestMethod.GET, produces = "application/json")
    public ListParcelTypesResponse listParcelTypes() {
        List<String> parcelTypes = getFixedDataService().getParcelTypes().stream().map(ParcelType::getName)
                .collect(Collectors.toList());
        return new ListParcelTypesResponse(parcelTypes);
    }

    @RequestMapping(value = "/listTransportationModes", method = RequestMethod.GET, produces = "application/json")
    public ListTransportationModesResponse listTransportationModes() {
        List<String> transportationModes = getFixedDataService().getTransportationModes().stream().map(
                TransportationMode::getMode).collect(Collectors.toList());
        return new ListTransportationModesResponse(transportationModes);
    }

    @RequestMapping(value = "/listActionDescriptions", method = RequestMethod.GET, produces = "application/json")
    public ListActionDescriptionsResponse listActionDescriptions() {
        List<String> actionDescriptions = getFixedDataService().getActionDescriptions().stream().map
                (ActionDescription::getAction).collect(Collectors.toList());
        return new ListActionDescriptionsResponse(actionDescriptions);
    }
}
