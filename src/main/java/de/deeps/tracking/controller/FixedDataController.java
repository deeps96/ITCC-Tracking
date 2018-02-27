package de.deeps.tracking.controller;

import de.deeps.tracking.dto.fixeddata.*;
import de.deeps.tracking.model.dbobjects.ActionDescription;
import de.deeps.tracking.model.dbobjects.ParcelType;
import de.deeps.tracking.model.dbobjects.TransportationMode;
import de.deeps.tracking.service.AuthorizationService;
import de.deeps.tracking.service.FixedDataService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201"})
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

    @RequestMapping(value = "/addTransportationMode", method = RequestMethod.POST)
    public void addTransportationMode(@RequestBody AddTransportationModeParameter parameter) throws
            IOException {
        checkPrivilege(parameter, "canAddTransportationMode");
        getFixedDataService().addTransportationMode(parameter.getMode());
    }

    @RequestMapping(value = "/addActionDescription", method = RequestMethod.POST)
    public void addActionDescription(@RequestBody AddActionDescriptionParameter parameter) throws
            IOException {
        checkPrivilege(parameter, "canAddActionDescription");
        validateInputNotBlank(parameter.getActionDescription());
        getFixedDataService().addActionDescription(parameter.getActionDescription());
    }

    @RequestMapping(value = "/addParcelType", method = RequestMethod.POST)
    public void addParcelType(@RequestBody AddParcelTypeParameter parameter) throws
            IOException {
        checkPrivilege(parameter, "canAddParcelType");
        validateInputNotBlank(parameter.getType(), parameter.getKey());
        getFixedDataService().addParcelType(parameter.getKey(), parameter.getType());
    }

    @RequestMapping(value = "/removeTransportationMode", method = RequestMethod.DELETE)
    public void removeTransportationMode(@RequestParam(value="authorizationToken") String authorizationToken,
                                      @RequestParam(value="mode") String mode) throws IOException {
        checkPrivilege(authorizationToken, "canRemoveTransportationMode");
        validateInputNotBlank(mode);
        getFixedDataService().removeTransportationMode(mode);
    }

    @RequestMapping(value = "/removeActionDescription", method = RequestMethod.DELETE)
    public void removeActionDescription(@RequestParam(value="authorizationToken") String authorizationToken,
                                      @RequestParam(value="action") String action) throws IOException {
        checkPrivilege(authorizationToken, "canRemoveActionDescription");
        validateInputNotBlank(action);
        getFixedDataService().removeActionDescription(action);
    }

    @RequestMapping(value = "/removeParcelType", method = RequestMethod.DELETE)
    public void removeParcelType(@RequestParam(value="authorizationToken") String authorizationToken,
                                        @RequestParam(value="type") String type) throws IOException {
        checkPrivilege(authorizationToken, "canRemoveParcelType");
        validateInputNotBlank(type);
        getFixedDataService().removeParcelType(type);
    }

}
