package com.tienda.bolsos.product;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repo;

    public Page<Product> getAll(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return repo.findAll(pageable);
    }

    public Page<Product> getByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("price").ascending());
        return repo.findByCategory(category, pageable);
    }

    public Product getById(String id) {
        return repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + id));
    }

    public Product save(Product product) {
        return repo.save(product);
    }

    public Product update(String id, Product updated) {
        Product existing = getById(id);
        existing.setName(updated.getName());
        existing.setSlug(updated.getSlug());
        existing.setPrice(updated.getPrice());
        existing.setCategory(updated.getCategory());
        existing.setImageUrl(updated.getImageUrl());
        existing.setDescription(updated.getDescription());
        existing.setStock(updated.getStock());
        existing.setNew(updated.isNew());
        return repo.save(existing);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}
