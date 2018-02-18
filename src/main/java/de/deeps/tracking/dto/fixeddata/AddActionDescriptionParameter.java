package de.deeps.tracking.dto.fixeddata;

import de.deeps.tracking.dto.authorization.AuthorizationParameter;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddActionDescriptionParameter extends AuthorizationParameter {

    private String actionDescription;
}
