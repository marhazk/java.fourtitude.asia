package asia.fourtitude.java.sboot.marhazk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Repo extends JpaRepository <Product, Integer>
{

}