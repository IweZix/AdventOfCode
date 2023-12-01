
public class Main {

    public static void main(String[] args) {
        Part1 part1 = new Part1();
        Part2 part2 = new Part2();
        try {
            part1.start();
            part2.start();
        } catch (Exception e) {
            e.printStackTrace();
        }


    }
}