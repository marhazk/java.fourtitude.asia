package asia.fourtitude.java.sboot.marhazk;
import asia.fourtitude.java.sboot.marhazk.config.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/")
public class Controller {
    @Autowired
    private Repo repo;
    private String ProductPrefix = "P";
    @GetMapping({"/"+Config.TableName})
    public ResponseEntity<Page<Product>> getProductPageable(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Product> p = repo.findAll(pageable);
        return new ResponseEntity<>(p, HttpStatus.OK);
    }
    @PostMapping({"/"+Config.TableName})
    public Product addNewProduct(@RequestBody Product product){
        return repo.save(product);
    }
    @GetMapping({"/"+Config.TableName+"/"+Config.pLatest})
    public ResponseEntity<Object> getLatestCode() {
        int lastID = (((int)repo.count())-1);
        Product p = repo.findAll().get(lastID);
        return ResponseEntity.ok(p);
    }
    @GetMapping({"/"+Config.TableName+"/"+Config.pNew})
    public ResponseEntity<Object> generateNewProduct() {
        int lastID = ((int)repo.count()-1);
        Product p = repo.findAll().get(lastID);
        String currCode = p.getCode().replace("P","");
        Integer newCodeID = (Integer.parseInt(currCode)+1);
        String newCode = ProductPrefix+String.format("%03d", newCodeID);
        Product nP = new Product();
        nP.setCode(newCode);
        nP.setName("");
        nP.setBrand("");
        nP.setType("");
        nP.setCategory("");
        nP.setDescription("");
        return ResponseEntity.ok(nP);
    }
    @GetMapping({"/"+Config.TableName+"/"+Config.pFirst})
    public ResponseEntity<Object> getFirstProduct() {
        Product p = repo.findAll().get(0);
        return ResponseEntity.ok(p);
    }
    @GetMapping({"/"+Config.TableName+"/"+Config.pLast})
    public ResponseEntity<Object> getLastProduct() {
        int lastID = (((int)repo.count())-1);
        Product p = repo.findAll().get(lastID);
        return ResponseEntity.ok(p);
    }
    @GetMapping({"/"+Config.TableName+"/{id}"})
    public ResponseEntity<Object> getProductById(@PathVariable int id) {
        Product p = repo.findById(id)
                .orElseThrow(() -> new RException("Product not exist with id :" + id));
        return ResponseEntity.ok(p);
    }

    //These for the updates
    @PutMapping({"/"+Config.TableName+"/{id}"})
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product productDetails){
        Product p = repo.findById(id).orElseThrow(() -> new RException("Product not exist with id :" + id));
        p.setName(productDetails.getName());
        p.setBrand(productDetails.getBrand());
        p.setType(productDetails.getType());
        p.setCategory(productDetails.getCategory());
        p.setDescription(productDetails.getDescription());
        return ResponseEntity.ok(repo.save(p));
    }

    @DeleteMapping({"/"+Config.TableName+"/{id}"})
    public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable int id){
        Product p = repo.findById(id).orElseThrow(() -> new RException("Product not exist with id :" + id));
        repo.delete(p);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
