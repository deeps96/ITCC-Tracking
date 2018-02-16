package de.deeps.tracking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AuthenticationParameter {

    private String accessToken;
}
