package de.deeps.tracking.dto.fixeddata;

import de.deeps.tracking.dto.authorization.AuthorizationParameter;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddTransportationModeParameter extends AuthorizationParameter {

    private String mode;
}
