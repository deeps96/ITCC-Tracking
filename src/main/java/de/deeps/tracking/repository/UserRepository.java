package de.deeps.tracking.repository;

import de.deeps.tracking.model.dbobjects.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByEmailAndHashedPassword(String email, String hashedPassword);
    List<User> findByRoleID(String roleID);
}
