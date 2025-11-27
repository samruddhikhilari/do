package com.vit.result.controller;

import com.vit.result.model.Student;
import com.vit.result.repository.StudentRepository;
import com.vit.result.service.ResultCalculationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class ResultController {
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private ResultCalculationService resultService;
    
    @GetMapping
    public List<Student> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        students.forEach(student -> {
            if (student.getTotalMarks() == null) {
                resultService.calculateResults(student);
            }
        });
        return students;
    }
    
    @GetMapping("/regno/{regNo}")
    public ResponseEntity<Student> getStudentByRegNo(@PathVariable String regNo) {
        Student student = studentRepository.findByRegNo(regNo);
        if (student != null) {
            if (student.getTotalMarks() == null) {
                resultService.calculateResults(student);
            }
            return ResponseEntity.ok(student);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        // Calculate results before saving
        resultService.calculateResults(student);
        return studentRepository.save(student);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable String id) {
        return studentRepository.findById(id)
                .map(student -> {
                    if (student.getTotalMarks() == null) {
                        resultService.calculateResults(student);
                    }
                    return ResponseEntity.ok(student);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
