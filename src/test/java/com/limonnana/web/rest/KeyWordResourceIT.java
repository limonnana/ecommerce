package com.limonnana.web.rest;

import com.limonnana.LimonnanaApp;
import com.limonnana.domain.KeyWord;
import com.limonnana.repository.KeyWordRepository;
import com.limonnana.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.limonnana.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link KeyWordResource} REST controller.
 */
@SpringBootTest(classes = LimonnanaApp.class)
public class KeyWordResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private KeyWordRepository keyWordRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restKeyWordMockMvc;

    private KeyWord keyWord;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KeyWordResource keyWordResource = new KeyWordResource(keyWordRepository);
        this.restKeyWordMockMvc = MockMvcBuilders.standaloneSetup(keyWordResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KeyWord createEntity(EntityManager em) {
        KeyWord keyWord = new KeyWord()
            .name(DEFAULT_NAME);
        return keyWord;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KeyWord createUpdatedEntity(EntityManager em) {
        KeyWord keyWord = new KeyWord()
            .name(UPDATED_NAME);
        return keyWord;
    }

    @BeforeEach
    public void initTest() {
        keyWord = createEntity(em);
    }

    @Test
    @Transactional
    public void createKeyWord() throws Exception {
        int databaseSizeBeforeCreate = keyWordRepository.findAll().size();

        // Create the KeyWord
        restKeyWordMockMvc.perform(post("/api/key-words")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyWord)))
            .andExpect(status().isCreated());

        // Validate the KeyWord in the database
        List<KeyWord> keyWordList = keyWordRepository.findAll();
        assertThat(keyWordList).hasSize(databaseSizeBeforeCreate + 1);
        KeyWord testKeyWord = keyWordList.get(keyWordList.size() - 1);
        assertThat(testKeyWord.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createKeyWordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = keyWordRepository.findAll().size();

        // Create the KeyWord with an existing ID
        keyWord.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKeyWordMockMvc.perform(post("/api/key-words")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyWord)))
            .andExpect(status().isBadRequest());

        // Validate the KeyWord in the database
        List<KeyWord> keyWordList = keyWordRepository.findAll();
        assertThat(keyWordList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = keyWordRepository.findAll().size();
        // set the field null
        keyWord.setName(null);

        // Create the KeyWord, which fails.

        restKeyWordMockMvc.perform(post("/api/key-words")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyWord)))
            .andExpect(status().isBadRequest());

        List<KeyWord> keyWordList = keyWordRepository.findAll();
        assertThat(keyWordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllKeyWords() throws Exception {
        // Initialize the database
        keyWordRepository.saveAndFlush(keyWord);

        // Get all the keyWordList
        restKeyWordMockMvc.perform(get("/api/key-words?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(keyWord.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getKeyWord() throws Exception {
        // Initialize the database
        keyWordRepository.saveAndFlush(keyWord);

        // Get the keyWord
        restKeyWordMockMvc.perform(get("/api/key-words/{id}", keyWord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(keyWord.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingKeyWord() throws Exception {
        // Get the keyWord
        restKeyWordMockMvc.perform(get("/api/key-words/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKeyWord() throws Exception {
        // Initialize the database
        keyWordRepository.saveAndFlush(keyWord);

        int databaseSizeBeforeUpdate = keyWordRepository.findAll().size();

        // Update the keyWord
        KeyWord updatedKeyWord = keyWordRepository.findById(keyWord.getId()).get();
        // Disconnect from session so that the updates on updatedKeyWord are not directly saved in db
        em.detach(updatedKeyWord);
        updatedKeyWord
            .name(UPDATED_NAME);

        restKeyWordMockMvc.perform(put("/api/key-words")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKeyWord)))
            .andExpect(status().isOk());

        // Validate the KeyWord in the database
        List<KeyWord> keyWordList = keyWordRepository.findAll();
        assertThat(keyWordList).hasSize(databaseSizeBeforeUpdate);
        KeyWord testKeyWord = keyWordList.get(keyWordList.size() - 1);
        assertThat(testKeyWord.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingKeyWord() throws Exception {
        int databaseSizeBeforeUpdate = keyWordRepository.findAll().size();

        // Create the KeyWord

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKeyWordMockMvc.perform(put("/api/key-words")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyWord)))
            .andExpect(status().isBadRequest());

        // Validate the KeyWord in the database
        List<KeyWord> keyWordList = keyWordRepository.findAll();
        assertThat(keyWordList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteKeyWord() throws Exception {
        // Initialize the database
        keyWordRepository.saveAndFlush(keyWord);

        int databaseSizeBeforeDelete = keyWordRepository.findAll().size();

        // Delete the keyWord
        restKeyWordMockMvc.perform(delete("/api/key-words/{id}", keyWord.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KeyWord> keyWordList = keyWordRepository.findAll();
        assertThat(keyWordList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KeyWord.class);
        KeyWord keyWord1 = new KeyWord();
        keyWord1.setId(1L);
        KeyWord keyWord2 = new KeyWord();
        keyWord2.setId(keyWord1.getId());
        assertThat(keyWord1).isEqualTo(keyWord2);
        keyWord2.setId(2L);
        assertThat(keyWord1).isNotEqualTo(keyWord2);
        keyWord1.setId(null);
        assertThat(keyWord1).isNotEqualTo(keyWord2);
    }
}
