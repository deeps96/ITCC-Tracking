package de.deeps.tracking.dto.authorization;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AuthorizationParameter {

    private String authorizationToken;
}
