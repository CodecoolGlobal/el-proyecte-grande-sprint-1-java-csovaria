package com.codecool.gift_rocket.service;

import com.codecool.gift_rocket.model.Category;
import com.codecool.gift_rocket.model.Product;
import com.codecool.gift_rocket.model.ProductBox;
import com.codecool.gift_rocket.repository.CartDao;
import com.codecool.gift_rocket.repository.ProductBoxDao;
import com.codecool.gift_rocket.repository.ProductDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ShopService {

    private ProductDao productDao;
    private ProductBoxDao productBoxDao;

    private CartDao cartDao;

    @Autowired
    public ShopService(ProductDao productDao, ProductBoxDao productBoxDao, CartDao cartDao){
        this.productDao = productDao;
        this.productBoxDao = productBoxDao;
        this.cartDao = cartDao;
    }

    public void addNewProduct(Product product) {
        productDao.add(product);
    }

    public void addProductToProductBox(Product product, UUID boxId) {
        productBoxDao.addProduct(product, boxId);
    }

    public List<Product> getAllProducts() {
        return productDao.getAll();
    }

    public Product findProduct(UUID id) {
        return productDao.find(id);
    }

    public void removeProduct(UUID id){
        productDao.remove(id);
    }

    public List<Product> getProductsByCategory(Category category) {
        return productDao.getByCategory(category);
    }

    public void addNewProductBox(ProductBox productBox) {
        productBoxDao.addNewProductBox(productBox);
    }

    public ProductBox findProductBox(UUID uuid) {
        return productBoxDao.find(uuid);
    }

    public void removeProductBox(UUID uuid) {
        productBoxDao.removeProductBox(uuid);
    }

    public Map<Product, Integer> getAllProductsInBox(UUID boxId) {
        return productBoxDao.getAllProductsInProductBox(boxId);
    }

    public ProductBox getProductBoxValue(UUID uuid) {
        productBoxDao.getProductBoxValue(uuid);
    }
}
