package de.deeps.tracking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddTransportationModeParameter extends AuthorizationParameter {

    private String mode;
}
