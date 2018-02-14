package de.deeps.tracking.model;


import de.deeps.tracking.model.dbobjects.AuthorizationEntry;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Getter(AccessLevel.PRIVATE)
@Setter(AccessLevel.PRIVATE)
class AuthorizationTest {

    private AuthorizationEntry authorizationEntry;

    @BeforeEach
    void setUp() {
        setUpAuthorizationEntry();
    }

    private void setUpAuthorizationEntry() {
        AuthorizationEntry entry = new AuthorizationEntry();
        entry.setHashedPassword("998ed4d621742d0c2d85ed84173db569afa194d4597686cae947324aa58ab4bb");
        setAuthorizationEntry(entry);
    }

    @Test
    void isAuthorized() {
        assertTrue(Authorization.isAuthorized(getAuthorizationEntry(),
                "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"));
        assertFalse(Authorization.isAuthorized(getAuthorizationEntry(),
                "wrongpassword"));
    }
}