import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import static java.lang.Integer.parseInt;

public class Part2 {

    static String[] nums = {"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
    
    int sum = 0;
    
    private static String wordToNumber(String word) {
        String num = "";
        for (int i = 0; i < word.length(); i++) {
            if (Character.isDigit(word.charAt(i))) {
                num += word.charAt(i);
                continue;
            }
            for (int j = 0; j < nums.length; j++) {
                if (word.substring(i).startsWith(nums[j])) {
                    num += j + 1;
                    i += nums[j].length() - 2;
                    break;
                }
            }
        }
        return num;
    }

    public void start() throws FileNotFoundException {
        Scanner inFile = new Scanner(new FileReader("./inputDayOne.txt"));
        while (inFile.hasNext()) {
            String line = inFile.nextLine();
            String num = wordToNumber(line);
            sum += parseInt((num.charAt(0) + "" + num.charAt(num.length() - 1)));
        }

        System.out.println("The sum is: " + sum);
    }
}
