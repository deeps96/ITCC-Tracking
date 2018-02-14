package de.deeps.tracking.service;

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
import java.util.Date;
import java.util.NoSuchElementException;

@Service
@Getter(AccessLevel.PRIVATE)
@Setter(AccessLevel.PRIVATE)
@Slf4j
public class ParcelService {

    private final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("ddMMyy");

    private ParcelRepository parcelRepository;
    private ParcelTypeRepository parcelTypeRepository;
    private String parcelTypeIDForName;

    @Autowired
    public ParcelService(ParcelRepository parcelRepository, ParcelTypeRepository parcelTypeRepository) {
        setParcelRepository(parcelRepository);
        setParcelTypeRepository(parcelTypeRepository);
    }

    public String createParcel(String parcelTypeName, Location departure, Location destination, long
            handOverTimestamp) {
        try {
            ParcelEntry parcel = new ParcelEntry(departure, destination, handOverTimestamp);
            completeParcelInformation(parcel, parcelTypeName);
            getParcelRepository().save(parcel);
            return parcel.getTrackingNumber();
        } catch (NoSuchElementException e) {
            log.error(e.getMessage());
            return null;
        }
    }

    private void completeParcelInformation(ParcelEntry parcelEntry, String parcelTypeName) {
        ParcelType parcelType = getParcelTypeRepository().findByName(parcelTypeName);
        if (parcelType == null) { throw new NoSuchElementException("Parcel type does not exists!"); }
        completeParcelInformation(parcelEntry, parcelType);
    }

    private void completeParcelInformation(ParcelEntry parcelEntry, ParcelType parcelType) {
        parcelEntry.setParcelTypeID(parcelType.getId());
        generateTrackingNumberForParcel(parcelEntry, parcelType);
    }

    private synchronized void generateTrackingNumberForParcel(ParcelEntry parcelEntry, ParcelType parcelType) {
        StringBuilder trackingNumber = new StringBuilder(parcelType.getKey());
        trackingNumber.append(parcelEntry.getDeparture().getCity().getZipCode());
        trackingNumber.append(parcelEntry.getDestination().getCity().getZipCode());
        trackingNumber.append(getSimpleDateFormat().format(new Date(parcelEntry.getHandOverTimestamp())));
        trackingNumber.append(getParcelRepository().count());
        trackingNumber.append(calculateParcelChecksumFor(trackingNumber.toString()));
        parcelEntry.setTrackingNumber(trackingNumber.toString());
    }

    private int calculateParcelChecksumFor(String trackingNumber) {
        int sum = 0;
        for (char c : trackingNumber.toCharArray()){
            sum += Character.getNumericValue(c);
        }
        return sum % 10;
    }

}
