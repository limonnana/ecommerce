package com.limonnana.service;


import com.limonnana.domain.Category;
import com.limonnana.domain.KeyWord;
import com.limonnana.domain.Product;
import com.limonnana.repository.CategoryRepository;
import com.limonnana.repository.KeyWordRepository;
import com.limonnana.repository.ProductRepository;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class CategoryService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private  final KeyWordRepository keyWordRepository;

    public CategoryService(ProductRepository productRepository, CategoryRepository categoryRepository, KeyWordRepository keyWordRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.keyWordRepository = keyWordRepository;
    }

    public Category findById(Long id){
        Category result = new Category();
        Optional<Category> category = categoryRepository.findById(id);
        if(category.isPresent()){
            result = category.get();
            Hibernate.initialize(result.getProducts());
            Hibernate.initialize(result.getCategories());
        }
        return result;
    }

    public Product saveKeyWordsInCategoryAndProduct(Product product){

        Category category = categoryRepository.findById(product.getCategory().longValue()).get();
        String[] keyWords = product.getKeyWord().split(",");
        KeyWord k = new KeyWord();

        for(String key : keyWords){
            String keyClean = key.toLowerCase().trim();
            Optional<KeyWord> inDb = keyWordRepository.findOneByName(keyClean);
            if(!inDb.isPresent()){
                k.setName(keyClean);
                k.setCategory(category);

            }else{
                k = inDb.get();
            }
            if(product.getKeyWords() == null){
                product.setKeyWords(new HashSet<KeyWord>());
            }
            product.getKeyWords().add(k);
        }

        Hibernate.initialize(category.getProducts());
        Set<Product> productList = category.getProducts();
        productList.add(product);
        category = categoryRepository.save(category);
        for(Product p : category.getProducts()){
            if(p.getName().equals(product.getName())){
                product = p;
                break;
            }
        }
        return product;
    }
}
