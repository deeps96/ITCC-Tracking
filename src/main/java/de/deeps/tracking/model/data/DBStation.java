package de.deeps.tracking.model.data;

import de.deeps.tracking.dto.Station;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;

@Getter
@Setter
public class DBStation {

    private Location location;
    private ObjectId stationId;
    private String actionDescriptionID, transportationModeID;
    private String notes;

    public DBStation(Station station){
        setLocation(station.getLocation());
        setNotes(station.getNotes());
        setStationId(new ObjectId());
    }

}
