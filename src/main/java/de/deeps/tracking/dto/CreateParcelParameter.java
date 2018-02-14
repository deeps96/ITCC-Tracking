package de.deeps.tracking.dto;

import de.deeps.tracking.model.data.Location;
import de.deeps.tracking.model.data.ParcelType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateParcelParameter {

    private Location departure, destination;
    private long handOverTimestamp;
    private ParcelType parcelType;
}
