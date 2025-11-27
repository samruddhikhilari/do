package com.vit.result.repository;

import com.vit.result.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<Student, String> {
    Student findByRegNo(String regNo);
}
