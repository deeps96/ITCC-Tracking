package de.deeps.tracking.repository;

import de.deeps.tracking.model.dbobjects.Role;
import de.deeps.tracking.model.dbobjects.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {

    Role findByName(String name);
}
