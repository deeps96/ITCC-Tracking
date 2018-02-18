package de.deeps.tracking.service;

import de.deeps.tracking.dto.parcelmanagement.Parcel;
import de.deeps.tracking.dto.parcelmanagement.Station;
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

import java.io.IOException;
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
            handOverTimestamp, String departurePersonDetails, String destinationPersonDetails) {
        try {
            ParcelEntry parcelEntry = new ParcelEntry(departure, destination, handOverTimestamp,
                    departurePersonDetails, destinationPersonDetails);
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

    public Parcel getParcel(String trackingNumber) throws IOException {
        ParcelEntry entry = getParcelRepository().findByTrackingNumber(trackingNumber);
        if (entry == null) { throw new IOException("No parcel found for given tracking number"); }
        return convertParcelEntryToParcel(entry);
    }

    //actions
    private synchronized void completeParcelInformation(ParcelEntry parcelEntry, String parcelTypeName) {
        ParcelType parcelType = getParcelTypeRepository().findByName(parcelTypeName);
        if (parcelType == null) { throw new NoSuchElementException("Parcel type does not exists!"); }
        getParcelManagement().completeParcelInformation(parcelEntry, parcelType, getParcelRepository().count());
    }

    //conversion
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

    private Parcel convertParcelEntryToParcel(ParcelEntry entry) {
        if (entry == null) { return null; }
        List<Station> stations = convertDBStationsToStations(entry.getStations());
        ParcelType parcelType = getParcelTypeRepository().findOne(entry.getParcelTypeID());
        if (parcelType == null) {
            return null;
        }
        return new Parcel(stations, entry.getDeparture(), entry.getDestination(), entry.getHandOverTimestamp(),
                entry.getTrackingNumber(), parcelType.getName(), entry.getDeparturePersonDetails(), entry.getDestinationPersonDetails());
    }

    private List<Station> convertDBStationsToStations(List<DBStation> stations) {
        return stations.stream().map(dbStation -> {
            ActionDescription actionDescription = getActionDescriptionRepository().findOne(dbStation
                    .getActionDescriptionID());
            TransportationMode mode = getTransportationModeRepository().findOne(dbStation.getTransportationModeID());
            if (actionDescription == null || mode == null) { return null; }
            return new Station(dbStation.getLocation(), actionDescription.getAction(), dbStation.getNotes(), mode
                    .getMode(), dbStation.getTimestamp());
        }).collect(Collectors.toList());
    }
}
