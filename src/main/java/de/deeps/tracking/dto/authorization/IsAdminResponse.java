package de.deeps.tracking.dto.authorization;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IsAdminResponse {

    private boolean admin;

    public IsAdminResponse(boolean admin) {
        setAdmin(admin);
    }
}
