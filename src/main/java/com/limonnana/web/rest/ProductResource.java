package com.limonnana.web.rest;

import com.limonnana.domain.Category;
import com.limonnana.domain.KeyWord;
import com.limonnana.domain.Product;
import com.limonnana.domain.SearchDTO;
import com.limonnana.repository.CategoryRepository;
import com.limonnana.repository.KeyWordRepository;
import com.limonnana.repository.ProductRepository;
import com.limonnana.service.CategoryService;
import com.limonnana.service.ProductService;
import com.limonnana.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.*;

/**
 * REST controller for managing {@link com.limonnana.domain.Product}.
 */
@RestController
@RequestMapping("/api")
public class ProductResource {

    private final Logger log = LoggerFactory.getLogger(ProductResource.class);

    private static final String ENTITY_NAME = "product";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductService productService;

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private  final KeyWordRepository keyWordRepository;

    private final CategoryService categoryService;

    public ProductResource(
                           ProductRepository productRepository,
                           CategoryRepository categoryRepository,
                           KeyWordRepository keyWordRepository,
                           CategoryService categoryService,
                           ProductService productService
    ) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.keyWordRepository = keyWordRepository;
        this.categoryService = categoryService;
        this.productService = productService;
    }

    /**
     * {@code POST  /products} : Create a new product.
     *
     * @param product the product to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new product, or with status {@code 400 (Bad Request)} if the product has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) throws URISyntaxException {
        Product result = null;
        log.debug("REST request to save Product : {}", product);
        if (product.getId() != null) {
            throw new BadRequestAlertException("A new product cannot already have an ID", ENTITY_NAME, "idexists");
        }

        categoryService.saveKeyWordsInCategoryAndProduct(product);
        Product p = new Product();
        p.setId(1L);
        result = p;

        return ResponseEntity.created(new URI("/api/products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /products} : Updates an existing product.
     *
     * @param product the product to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated product,
     * or with status {@code 400 (Bad Request)} if the product is not valid,
     * or with status {@code 500 (Internal Server Error)} if the product couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/products")
    public ResponseEntity<Product> updateProduct(@Valid @RequestBody Product product) throws URISyntaxException {
        Product result = null;
        log.debug("REST request to update Product : {}", product);
        if (product.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if(product.getCategory() != null && product.getCategory().intValue() > 0 ) {
            //saveProductInCategory(product);
            categoryService.saveKeyWordsInCategoryAndProduct(product);
            result = new Product();
            result.setId(1L);
        }else
        {
            result = productRepository.save(product);
        }
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, product.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /products} : get all the products.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of products in body.
     */
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        log.debug("REST request to get all Products");
        return productRepository.findAll();
    }

    @PostMapping("/productsSearch")
    public List<Product> searchProducts(@RequestBody SearchDTO query) {
        log.debug("REST request to get all Products Search: " + query.getQuery());
        List list = new ArrayList(productService.findAllByKeyWord(query));
        return list;
    }

    /**
     * {@code GET  /products/:id} : get the "id" product.
     *
     * @param id the id of the product to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the product, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        log.debug("REST request to get Product : {}", id);
        Product product = productService.getProduct(id);

        return ResponseEntity.ok().body(product);
    }

    /**
     * {@code DELETE  /products/:id} : delete the "id" product.
     *
     * @param id the id of the product to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        log.debug("REST request to delete Product : {}", id);
        productRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }


}
