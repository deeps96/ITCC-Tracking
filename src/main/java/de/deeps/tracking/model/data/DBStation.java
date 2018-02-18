package de.deeps.tracking.model.data;

import de.deeps.tracking.dto.parcelmanagement.Station;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;

@Getter
@Setter
public class DBStation {

    private Location location;
    private long timestamp;
    private ObjectId stationId;
    private String actionDescriptionID, transportationModeID, notes;

    public DBStation() {}

    public DBStation(Station station){
        setLocation(station.getLocation());
        setNotes(station.getNotes());
        setStationId(new ObjectId());
        setTimestamp(station.getTimestamp());
    }

}
