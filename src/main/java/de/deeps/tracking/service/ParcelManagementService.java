package de.deeps.tracking.service;

import de.deeps.tracking.dto.Station;
import de.deeps.tracking.model.ParcelManagement;
import de.deeps.tracking.model.data.DBStation;
import de.deeps.tracking.model.data.Location;
import de.deeps.tracking.model.dbobjects.ActionDescription;
import de.deeps.tracking.model.dbobjects.ParcelEntry;
import de.deeps.tracking.model.dbobjects.ParcelType;
import de.deeps.tracking.model.dbobjects.TransportationMode;
import de.deeps.tracking.repository.ActionDescriptionRepository;
import de.deeps.tracking.repository.ParcelRepository;
import de.deeps.tracking.repository.ParcelTypeRepository;
import de.deeps.tracking.repository.TransportationModeRepository;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Getter(AccessLevel.PRIVATE)
@Setter(AccessLevel.PRIVATE)
@Slf4j
public class ParcelManagementService {

    private final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("ddMMyy");

    private ActionDescriptionRepository actionDescriptionRepository;
    private ParcelManagement parcelManagement;
    private ParcelRepository parcelRepository;
    private ParcelTypeRepository parcelTypeRepository;
    private String parcelTypeIDForName;
    private TransportationModeRepository transportationModeRepository;

    @Autowired
    public ParcelManagementService(ParcelRepository parcelRepository, ParcelTypeRepository parcelTypeRepository,
                                   ActionDescriptionRepository actionDescriptionRepository,
                                   TransportationModeRepository transportationModeRepository) {
        setParcelRepository(parcelRepository);
        setParcelTypeRepository(parcelTypeRepository);
        setParcelManagement(new ParcelManagement());
        setActionDescriptionRepository(actionDescriptionRepository);
        setTransportationModeRepository(transportationModeRepository);
    }

    //convenience
    public String createParcel(String parcelTypeName, Location departure, Location destination, long
            handOverTimestamp) {
        try {
            ParcelEntry parcelEntry = new ParcelEntry(departure, destination, handOverTimestamp);
            completeParcelInformation(parcelEntry, parcelTypeName);
            getParcelRepository().save(parcelEntry);
            return parcelEntry.getTrackingNumber();
        } catch (NoSuchElementException e) {
            log.error(e.getMessage());
            return null;
        }
    }

    public boolean addStationToParcel(String trackingNumber, Station station) {
        DBStation dbStation = convertStationToDBStation(station);
        ParcelEntry parcel = getParcelRepository().findByTrackingNumber(trackingNumber);
        if (parcel == null || dbStation == null) {
            return false;
        }
        parcel.getStations().add(dbStation);
        getParcelRepository().save(parcel);
        return true;
    }

    public List<String> getParcelTypes() {
        return getParcelTypeRepository().findAll().stream().map(ParcelType::getName).collect(Collectors.toList());
    }

    public List<String> getTransportationModes() {
        return getTransportationModeRepository().findAll().stream().map(TransportationMode::getMode).collect(Collectors
                .toList());
    }

    public List<String> getActionDescriptions() {
        return getActionDescriptionRepository().findAll().stream().map(ActionDescription::getAction).collect(Collectors
                .toList());
    }

    //actions
    private synchronized void completeParcelInformation(ParcelEntry parcelEntry, String parcelTypeName) {
        ParcelType parcelType = getParcelTypeRepository().findByName(parcelTypeName);
        if (parcelType == null) { throw new NoSuchElementException("Parcel type does not exists!"); }
        getParcelManagement().completeParcelInformation(parcelEntry, parcelType, getParcelRepository().count());
    }

    private DBStation convertStationToDBStation(Station station) {
        DBStation dbStation = new DBStation(station);
        ActionDescription description = getActionDescriptionRepository().findByAction(station.getActionDescription());
        TransportationMode mode = getTransportationModeRepository().findByMode(station.getTransportationMode());
        if (mode == null || description == null) {
            return null;
        }
        dbStation.setActionDescriptionID(description.getId());
        dbStation.setTransportationModeID(mode.getId());
        return dbStation;
    }

}
