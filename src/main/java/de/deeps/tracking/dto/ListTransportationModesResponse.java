package de.deeps.tracking.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ListTransportationModesResponse {

    private List<String> transportationModes;

    public ListTransportationModesResponse(List<String> transportationModes) {
        setTransportationModes(transportationModes);
    }
}
