package com.vit.result.service;

import com.vit.result.model.Student;
import org.springframework.stereotype.Service;

@Service
public class ResultCalculationService {
    
    public boolean calculateResults(Student student) {
        // Check if any subject's MSE is less than 30 or ESE is less than 70
        if (!isValidMarks(student.getSub1Mse(), student.getSub1Ese()) ||
            !isValidMarks(student.getSub2Mse(), student.getSub2Ese()) ||
            !isValidMarks(student.getSub3Mse(), student.getSub3Ese()) ||
            !isValidMarks(student.getSub4Mse(), student.getSub4Ese())) {
            student.setGrade("I"); // 'I' for Incomplete/Invalid
            student.setTotalMarks(0.0);
            return false;
        }
        
        // Calculate total marks using the weighted calculation
        double total = 0;
        total += calculateSubjectTotal(student.getSub1Mse(), student.getSub1Ese());
        total += calculateSubjectTotal(student.getSub2Mse(), student.getSub2Ese());
        total += calculateSubjectTotal(student.getSub3Mse(), student.getSub3Ese());
        total += calculateSubjectTotal(student.getSub4Mse(), student.getSub4Ese());
        
        double average = total / 4; // Average percentage
        student.setTotalMarks(average);
        
        // Determine grade based on average
        String grade = calculateGrade(average);
        student.setGrade(grade);
        
        return true;
    }
    
    private boolean isValidMarks(Double mse, Double ese) {
        // Check if marks are not null and meet minimum requirements
        return mse != null && ese != null &&
               mse >= 30 && mse <= 100 &&
               ese >= 70 && ese <= 100;
    }
    
    private double calculateSubjectTotal(Double mse, Double ese) {
        // Calculate weighted total for a single subject (30% MSE + 70% ESE)
        return (mse * 0.3) + (ese * 0.7);
    }
    
    private String calculateGrade(double average) {
        if (average >= 90) return "A++";
        if (average >= 80) return "A+";
        if (average >= 70) return "A";
        if (average >= 60) return "B+";
        if (average >= 50) return "B";
        if (average >= 40) return "C";
        return "F";
    }
}
