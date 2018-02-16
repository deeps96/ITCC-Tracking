package de.deeps.tracking.repository;

import de.deeps.tracking.model.dbobjects.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorizationEntriesRepository extends MongoRepository<User, String> {

    User findByEmail(String email);
}
