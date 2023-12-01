import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.*;
import java.util.ArrayList;
import java.util.List;

import static java.lang.Integer.parseInt;

public class DayOne {

    int sum = 0;
    List<Integer> nums;

    public void start() throws FileNotFoundException {
        Scanner inFile = new Scanner(new FileReader("./inputDayOne.txt"));
        List<Integer> nums = new ArrayList<>();
        while (inFile.hasNext()) {

            String line = inFile.nextLine();

            for (int i = 0; i < line.length(); i++) {
                if (Character.isDigit(line.charAt(i))) {
                    nums.add(parseInt(String.valueOf(line.charAt(i))));
                }
            }

            String concatenedString = nums.getFirst().toString() + nums.getLast().toString();
            sum += parseInt(concatenedString);

            nums.clear();
        }

        System.out.println("The sum is: " + sum);
    }
}
