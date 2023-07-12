package asia.fourtitude.java.sboot.marhazk;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class RException extends RuntimeException{
    private static final long serialVersionUID= 1L;
    public RException(String message) {
        super(message);
    }
}
