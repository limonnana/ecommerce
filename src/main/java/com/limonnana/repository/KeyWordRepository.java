package com.limonnana.repository;

import com.limonnana.domain.KeyWord;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the KeyWord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KeyWordRepository extends JpaRepository<KeyWord, Long> {

    Optional<KeyWord> findOneByName(String name);

}
