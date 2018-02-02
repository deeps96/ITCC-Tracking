package de.deeps.tracking.repository;

import de.deeps.tracking.model.AuthorizationEntry;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorizationRepository extends MongoRepository<AuthorizationEntry, String> {

    AuthorizationEntry findByEmailAddress(String emailAddress);
}
