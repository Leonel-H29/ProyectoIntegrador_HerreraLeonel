package com.portafolio.mgb.repository;

import com.portafolio.mgb.model.HardSkills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HardSkillsRepository extends JpaRepository<HardSkills, Integer>{
    
}
