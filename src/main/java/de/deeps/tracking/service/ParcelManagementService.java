package de.deeps.tracking.service;

import de.deeps.tracking.model.ParcelManagement;
import de.deeps.tracking.model.data.Location;
import de.deeps.tracking.model.dbobjects.ParcelEntry;
import de.deeps.tracking.model.dbobjects.ParcelType;
import de.deeps.tracking.repository.ParcelRepository;
import de.deeps.tracking.repository.ParcelTypeRepository;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.NoSuchElementException;

@Service
@Getter(AccessLevel.PRIVATE)
@Setter(AccessLevel.PRIVATE)
@Slf4j
public class ParcelManagementService {

    private final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("ddMMyy");

    private ParcelManagement parcelManagement;
    private ParcelRepository parcelRepository;
    private ParcelTypeRepository parcelTypeRepository;
    private String parcelTypeIDForName;

    @Autowired
    public ParcelManagementService(ParcelRepository parcelRepository, ParcelTypeRepository parcelTypeRepository) {
        setParcelRepository(parcelRepository);
        setParcelTypeRepository(parcelTypeRepository);
        setParcelManagement(new ParcelManagement());
    }

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

    private synchronized void completeParcelInformation(ParcelEntry parcelEntry, String parcelTypeName) {
        ParcelType parcelType = getParcelTypeRepository().findByName(parcelTypeName);
        if (parcelType == null) { throw new NoSuchElementException("Parcel type does not exists!"); }
        getParcelManagement().completeParcelInformation(parcelEntry, parcelType, getParcelRepository().count());
    }



}
