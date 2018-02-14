package de.deeps.tracking.model.dbobjects;

import de.deeps.tracking.model.data.Location;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "parcel-entries")
@Getter
@Setter
public class ParcelEntry {

    private Location departure, destination;
    private long handOverTimestamp;
    private String id, trackingNumber, parcelTypeID;

    public ParcelEntry(Location departure, Location destination, long handOverTimestamp) {
        setDeparture(departure);
        setDestination(destination);
        setHandOverTimestamp(handOverTimestamp);
    }
}
