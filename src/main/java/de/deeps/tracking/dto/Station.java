package de.deeps.tracking.dto;

import de.deeps.tracking.model.data.Location;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Station {

    private Location location;
    private String actionDescription, notes, transportationMode;

}
