package com.limonnana.service;


import com.limonnana.domain.Category;
import com.limonnana.domain.KeyWord;
import com.limonnana.domain.Product;
import com.limonnana.domain.SearchDTO;
import com.limonnana.repository.KeyWordRepository;
import com.limonnana.repository.ProductRepository;
import io.github.jhipster.web.util.ResponseUtil;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    private final KeyWordRepository keyWordRepository;

    private int loopCounter = 0;

    public ProductService(ProductRepository productRepository, KeyWordRepository keyWordRepository){
        this.productRepository = productRepository;
        this.keyWordRepository = keyWordRepository;
    }

    public Product getProduct(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if(product.isPresent()){
            Hibernate.initialize(product.get().getKeyWords());
        }
        return product.get();
    }

    public Set<Product> findAllByKeyWord(SearchDTO searchDTO){

        Set<Product> result = new HashSet<>();

        KeyWord keyWord = this.keyWordRepository.findKeyWordByName(searchDTO.getQuery());

        if(keyWord != null){
            String inverseKeys = tryNewKeys(searchDTO.getQuery());
            keyWord = this.keyWordRepository.findKeyWordByName(inverseKeys);
        }


        if(keyWord != null){
            Category category = keyWord.getCategory();
            result.addAll(category.getProducts());
            Hibernate.initialize(category.getCategories());
            if(category.getCategories() != null && !category.getCategories().isEmpty()){
                for(Category c : category.getCategories()){
                    result.addAll(c.getProducts());
                }
            }
        }
        return result;
    }

    private String tryNewKeys(String query){
        String [] original = query.split(" ");
        if(original.length>1){
            for(int i=0;i<original.length/2;i++){
                String aux = original[i];
                original[i] = original[original.length-1];
                original[original.length-1] = aux;
            }
        }
        return arrayToString(original);
    }

    private String arrayToString(String[] strArray) {

        StringBuilder stringBuilder = new StringBuilder();

        for (int i = 0; i < strArray.length; i++) {

            stringBuilder.append(strArray[i]);
            stringBuilder.append(" ");
        }

        return stringBuilder.toString().trim();

    }
}
