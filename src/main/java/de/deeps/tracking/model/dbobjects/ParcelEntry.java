package de.deeps.tracking.model.dbobjects;

import de.deeps.tracking.model.data.DBStation;
import de.deeps.tracking.model.data.Location;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.LinkedList;
import java.util.List;

@Document(collection = "parcel-entries")
@Getter
@Setter
public class ParcelEntry {

    private List<DBStation> stations;
    private Location departure, destination;
    private long handOverTimestamp;
    private String id, trackingNumber, parcelTypeID;

    public ParcelEntry(Location departure, Location destination, long handOverTimestamp) {
        setDeparture(departure);
        setDestination(destination);
        setHandOverTimestamp(handOverTimestamp);
        setStations(new LinkedList<>());
    }
}
