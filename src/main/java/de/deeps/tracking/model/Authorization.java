package de.deeps.tracking.model;

import com.google.common.hash.Hashing;
import de.deeps.tracking.model.dbobjects.AuthorizationEntry;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

public class Authorization {

    private Authorization() {}

    //convenience
    public static String generateNewToken() {
        return UUID.randomUUID().toString();
    }

    public static boolean isAuthorized(AuthorizationEntry entry, String password) {
        return entry != null && entry.getHashedPassword().equals(hashPassword(password));
    }

    //actions
    private static String hashPassword(String rawPassword) {
        return Hashing.sha256().hashString(rawPassword, StandardCharsets.UTF_8).toString();
    }
}
