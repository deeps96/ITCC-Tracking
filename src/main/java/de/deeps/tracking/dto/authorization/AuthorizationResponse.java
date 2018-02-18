package de.deeps.tracking.dto.authorization;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthorizationResponse {

    private boolean isAuthorized;
    private String authorizationToken;
}
