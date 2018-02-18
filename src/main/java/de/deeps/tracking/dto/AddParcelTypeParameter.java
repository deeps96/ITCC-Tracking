package de.deeps.tracking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddParcelTypeParameter extends AuthorizationParameter {

    private String type, key;
}
