package de.deeps.tracking.model;

import de.deeps.tracking.model.dbobjects.ParcelEntry;
import de.deeps.tracking.model.dbobjects.ParcelType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;

@Getter(AccessLevel.PRIVATE)
@Setter(AccessLevel.PRIVATE)
public class ParcelManagement {

    private final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("ddMMyy");

    //convenience
    public void completeParcelInformation(ParcelEntry parcelEntry, ParcelType parcelType, long count) {
        parcelEntry.setParcelTypeID(parcelType.getId());
        generateTrackingNumberForParcel(parcelEntry, parcelType, count);
    }

    //actions
    private void generateTrackingNumberForParcel(ParcelEntry parcelEntry, ParcelType parcelType, long count) {
        StringBuilder trackingNumber = new StringBuilder(parcelType.getKey());
        trackingNumber.append(parcelEntry.getDeparture().getCity().getZipCode());
        trackingNumber.append(parcelEntry.getDestination().getCity().getZipCode());
        trackingNumber.append(getSimpleDateFormat().format(new Date(parcelEntry.getHandOverTimestamp())));
        trackingNumber.append(count);
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
