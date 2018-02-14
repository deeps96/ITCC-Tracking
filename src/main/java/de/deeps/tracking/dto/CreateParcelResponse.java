package de.deeps.tracking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateParcelResponse {

    private String trackingNumber;

    public CreateParcelResponse(String trackingNumber) {
        setTrackingNumber(trackingNumber);
    }
}
