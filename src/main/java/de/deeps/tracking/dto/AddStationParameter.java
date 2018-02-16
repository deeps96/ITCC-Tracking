package de.deeps.tracking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddStationParameter {

    private Station station;
    private String trackingNumber;
}
