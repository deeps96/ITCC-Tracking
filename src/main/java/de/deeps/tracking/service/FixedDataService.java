package de.deeps.tracking.service;

import de.deeps.tracking.model.dbobjects.ActionDescription;
import de.deeps.tracking.model.dbobjects.ParcelType;
import de.deeps.tracking.model.dbobjects.TransportationMode;
import de.deeps.tracking.repository.ActionDescriptionRepository;
import de.deeps.tracking.repository.ParcelTypeRepository;
import de.deeps.tracking.repository.TransportationModeRepository;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter(AccessLevel.PRIVATE)
@Setter(AccessLevel.PRIVATE)
public class FixedDataService {

    private ActionDescriptionRepository actionDescriptionRepository;
    private ParcelTypeRepository parcelTypeRepository;
    private TransportationModeRepository transportationModeRepository;

    @Autowired
    public FixedDataService(ParcelTypeRepository parcelTypeRepository, ActionDescriptionRepository
            actionDescriptionRepository, TransportationModeRepository transportationModeRepository) {
        setParcelTypeRepository(parcelTypeRepository);
        setActionDescriptionRepository(actionDescriptionRepository);
        setTransportationModeRepository(transportationModeRepository);
    }

    public List<ParcelType> getParcelTypes() {
        return getParcelTypeRepository().findAll();
    }

    public List<TransportationMode> getTransportationModes() {
        return getTransportationModeRepository().findAll();
    }

    public List<ActionDescription> getActionDescriptions() {
        return getActionDescriptionRepository().findAll();
    }

}
