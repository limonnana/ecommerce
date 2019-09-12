package com.limonnana.service;


import com.limonnana.domain.Product;
import com.limonnana.repository.ProductRepository;
import io.github.jhipster.web.util.ResponseUtil;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public Product getProduct(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if(product.isPresent()){
            Hibernate.initialize(product.get().getKeyWords());
        }
        return product.get();
    }
}
