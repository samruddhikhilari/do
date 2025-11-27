package com.vit.result.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import org.bson.types.ObjectId;

@Data
@Document(collection = "students")
public class Student {
    @Id
    private String id;
    
    private String name;
    private String regNo;
    private String department;
    
    // Subject 1
    private Double sub1Mse;
    private Double sub1Ese;
    
    // Subject 2
    private Double sub2Mse;
    private Double sub2Ese;
    
    // Subject 3
    private Double sub3Mse;
    private Double sub3Ese;
    
    // Subject 4
    private Double sub4Mse;
    private Double sub4Ese;
    
    @Transient
    private Double totalMarks;
    
    @Transient
    private String grade;
    
    @Transient
    public void calculateResults() {
        double total = 0;
        total += (sub1Mse * 0.3) + (sub1Ese * 0.7);
        total += (sub2Mse * 0.3) + (sub2Ese * 0.7);
        total += (sub3Mse * 0.3) + (sub3Ese * 0.7);
        total += (sub4Mse * 0.3) + (sub4Ese * 0.7);
        this.totalMarks = total / 4; // Average percentage
        
        if (totalMarks >= 90) grade = "O";
        else if (totalMarks >= 80) grade = "A+";
        else if (totalMarks >= 70) grade = "A";
        else if (totalMarks >= 60) grade = "B+";
        else if (totalMarks >= 50) grade = "B";
        else grade = "F";
    }
}
