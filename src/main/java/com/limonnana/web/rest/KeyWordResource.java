package com.limonnana.web.rest;

import com.limonnana.domain.KeyWord;
import com.limonnana.repository.KeyWordRepository;
import com.limonnana.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.limonnana.domain.KeyWord}.
 */
@RestController
@RequestMapping("/api")
public class KeyWordResource {

    private final Logger log = LoggerFactory.getLogger(KeyWordResource.class);

    private static final String ENTITY_NAME = "keyWord";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KeyWordRepository keyWordRepository;

    public KeyWordResource(KeyWordRepository keyWordRepository) {
        this.keyWordRepository = keyWordRepository;
    }

    /**
     * {@code POST  /key-words} : Create a new keyWord.
     *
     * @param keyWord the keyWord to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new keyWord, or with status {@code 400 (Bad Request)} if the keyWord has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/key-words")
    public ResponseEntity<KeyWord> createKeyWord(@Valid @RequestBody KeyWord keyWord) throws URISyntaxException {
        log.debug("REST request to save KeyWord : {}", keyWord);
        if (keyWord.getId() != null) {
            throw new BadRequestAlertException("A new keyWord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KeyWord result = keyWordRepository.save(keyWord);
        return ResponseEntity.created(new URI("/api/key-words/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /key-words} : Updates an existing keyWord.
     *
     * @param keyWord the keyWord to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated keyWord,
     * or with status {@code 400 (Bad Request)} if the keyWord is not valid,
     * or with status {@code 500 (Internal Server Error)} if the keyWord couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/key-words")
    public ResponseEntity<KeyWord> updateKeyWord(@Valid @RequestBody KeyWord keyWord) throws URISyntaxException {
        log.debug("REST request to update KeyWord : {}", keyWord);
        if (keyWord.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        KeyWord result = keyWordRepository.save(keyWord);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, keyWord.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /key-words} : get all the keyWords.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of keyWords in body.
     */
    @GetMapping("/key-words")
    public List<KeyWord> getAllKeyWords() {
        log.debug("REST request to get all KeyWords");
        return keyWordRepository.findAll();
    }

    /**
     * {@code GET  /key-words/:id} : get the "id" keyWord.
     *
     * @param id the id of the keyWord to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the keyWord, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/key-words/{id}")
    public ResponseEntity<KeyWord> getKeyWord(@PathVariable Long id) {
        log.debug("REST request to get KeyWord : {}", id);
        Optional<KeyWord> keyWord = keyWordRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(keyWord);
    }

    /**
     * {@code DELETE  /key-words/:id} : delete the "id" keyWord.
     *
     * @param id the id of the keyWord to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/key-words/{id}")
    public ResponseEntity<Void> deleteKeyWord(@PathVariable Long id) {
        log.debug("REST request to delete KeyWord : {}", id);
        keyWordRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
