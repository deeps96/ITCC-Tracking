package de.deeps.tracking.dto;

import de.deeps.tracking.model.data.Location;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Station {

    private long timestamp;
    private Location location;
    private String actionDescription, notes, transportationMode;

    public Station() {}

    public Station(Location location, String actionDescription, String notes, String transportationMode, long
            timestamp) {
        setLocation(location);
        setActionDescription(actionDescription);
        setNotes(notes);
        setTransportationMode(transportationMode);
        setTimestamp(timestamp);
    }
}
