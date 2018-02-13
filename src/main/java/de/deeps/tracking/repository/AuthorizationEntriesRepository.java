package de.deeps.tracking.repository;

import de.deeps.tracking.model.dbobjects.AuthorizationEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorizationEntriesRepository extends MongoRepository<AuthorizationEntry, String> {

    AuthorizationEntry findByEmail(String email);
}
