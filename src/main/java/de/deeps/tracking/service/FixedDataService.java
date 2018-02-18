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

import javax.swing.*;
import java.io.IOException;
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

    public void addTransportationMode(String mode) throws IOException {
        TransportationMode transportationMode = getTransportationModeRepository().findByMode(mode);
        if (transportationMode != null) {
            if (!transportationMode.isRemoved()) {
                throw new IOException("Transportation mode is already existing!");
            }
            transportationMode.setRemoved(false);
        } else {
            transportationMode = new TransportationMode(mode);
        }
        getTransportationModeRepository().save(transportationMode);
    }

    public void addActionDescription(String action) throws IOException {
        ActionDescription actionDescription = getActionDescriptionRepository().findByAction(action);
        if (actionDescription != null) {
            if (!actionDescription.isRemoved()) {
                throw new IOException("Action description is already existing!");
            }
            actionDescription.setRemoved(false);
        } else {
            actionDescription = new ActionDescription(action);
        }
        getActionDescriptionRepository().save(actionDescription);
    }

    public void addParcelType(String key, String type) throws IOException {
        ParcelType parcelType = getParcelTypeRepository().findByName(type);
        if (parcelType != null) {
            if (!parcelType.isRemoved()) {
                throw new IOException("Parcel type is already existing!");
            }
            parcelType.setRemoved(false);
        } else {
            parcelType = new ParcelType(type, key);
        }
        getParcelTypeRepository().save(parcelType);
    }

    public void removeTransportationMode(String mode) {
        TransportationMode transportationMode = getTransportationModeRepository().findByMode(mode);
        if (transportationMode != null) {
            transportationMode.setRemoved(true);
            getTransportationModeRepository().save(transportationMode);
        }
    }

    public void removeActionDescription(String action) {
        ActionDescription actionDescription = getActionDescriptionRepository().findByAction(action);
        if (actionDescription != null) {
            actionDescription.setRemoved(true);
            getActionDescriptionRepository().save(actionDescription);
        }
    }

    public void removeParcelType(String type) {
        ParcelType parcelType = getParcelTypeRepository().findByName(type);
        if (parcelType != null) {
            parcelType.setRemoved(true);
            getParcelTypeRepository().save(parcelType);
        }
    }
}
