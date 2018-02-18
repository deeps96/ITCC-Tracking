package de.deeps.tracking.dto.fixeddata;

import de.deeps.tracking.dto.authorization.AuthorizationParameter;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddParcelTypeParameter extends AuthorizationParameter {

    private String type, key;
}
