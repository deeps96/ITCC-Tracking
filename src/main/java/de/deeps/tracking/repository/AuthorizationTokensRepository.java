package de.deeps.tracking.repository;

import de.deeps.tracking.model.dbobjects.AuthorizationToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorizationTokensRepository extends MongoRepository<AuthorizationToken, String> {

    AuthorizationToken findByToken(String token);
}
