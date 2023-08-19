package com.example.leadadminback.lead;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LeadRepository extends MongoRepository<Lead, String> {

}
