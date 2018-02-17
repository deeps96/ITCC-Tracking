package de.deeps.tracking.dto;

import de.deeps.tracking.model.data.Location;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
public class Parcel {

    private List<Station> stations;
    private Location departure, destination;
    private long handOverTimestamp;
    private String trackingNumber, parcelTypeName;

    public Parcel() {}

    public Parcel(Location departure, Location destination, long handOverTimestamp, String parcelTypeName) {
        this(new LinkedList<>(), departure, destination, handOverTimestamp, null, parcelTypeName);
    }

    public Parcel(List<Station> stations, Location departure, Location destination, long handOverTimestamp, String
            trackingNumber, String parcelTypeName) {
        setStations(stations);
        setDeparture(departure);
        setDestination(destination);
        setHandOverTimestamp(handOverTimestamp);
        setTrackingNumber(trackingNumber);
        setParcelTypeName(parcelTypeName);
    }
}
