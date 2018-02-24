package de.deeps.tracking.dto.parcelmanagement;

import de.deeps.tracking.dto.authorization.AuthorizationParameter;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddStationParameter extends AuthorizationParameter {

    private Station station;
    private String trackingNumber;
}
