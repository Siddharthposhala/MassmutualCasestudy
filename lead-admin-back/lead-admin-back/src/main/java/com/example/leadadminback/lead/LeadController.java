package com.example.leadadminback.lead;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/restapi/leads"})
@CrossOrigin(origins="http://localhost:3000")
public class LeadController {
    private final LeadService leadService;

    @Autowired
    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @GetMapping
    public List<Lead> getAllStudents() {
        return this.leadService.getAllLeads();
    }

    @PostMapping
    public Lead createLead(@RequestBody Lead lead) {
        return leadService.insertLead(lead);
    }

    @DeleteMapping("/{id}")
    public void deleteLead(@PathVariable String id) {
        leadService.deleteLeadById(id);
    }

    @PostMapping("/assign")
    public void assignLead(@RequestBody AssignRequest assignReq){
        leadService.assignLeadToAgent(assignReq);
    }
}
