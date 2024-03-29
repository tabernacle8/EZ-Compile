                                Ez-Compile
                        Created by: Carter K.


-------------------------
Basics
-------------------------
- Each line is 1 instruction

- Lines do not need to be ended with semi-colons

- Begin the main method by typing "main" on a line
    - You do not need an opening "{"

- End the main method with "end"
    - Ultimately, this puts a "}"

- If a line includes real java code (which has no shorthand in this converter) it will remain as-is
    - This means it will need proper syntax, such as ";" or anything else.

-------------------------
Variable Assignments
-------------------------

- Variable assignments start with "ass"
    Example: ass x = 10
    Note: Data types are not needed, they are automatically assigned

- Re-assign a Variable with "reass"
    Example: reass x = 5

- You can make a variable equal to "input" when using a scanner
    Example: ass x = input
    (This will gather user input and store it as "x")
    Note: If a scanner is not defined, it will automatically make one.

-------------------------
Scanner
-------------------------

- Assign a scanner using "scanner ="
    Example: scanner = hello
    (This will create a new instance of the scanner class and assign it to the variable "hello")
    NOTE: "hello" cannot be re-assigned. The converter remembers this variable. When calling the scanner, this variable is not needed.

-------------------------
For Loops
-------------------------

- Declare a for loop like this: for(x<10,++)
    - This has two parts, the thing to be evaluated and the operator to be applied to the variable
        - x<10 evaluates before the loop is ran.
        - This compiler will automatically assign the variable you put (x in this example) as 0 and then run this comparison
        - 10 can be replaced with another variable
        - ++ is the operator to be applied to x
            - The operator may be either "++" or "--"

-------------------------
Run Loop
-------------------------

- Declare a run loop like this: run(x,10){}
    - x is the track variable, just make sure its not already assigned nor changed
    - 10 is the ammount of times to run the code. The code to be ran goes inside the {}
        - The code can be multiple lines

-------------------------
Method Assignments
-------------------------

- getter
    - Helps with get methods for variables
    - USE: getter variablename:methodname
        - This converts it to public String variablename with a return of "methodname"

-------------------------
Example Code:
-------------------------
main

ass x = 5
ass y = hello
scanner = scan
ass hello = input


for(z<10,++){
    sop x
    sop wow! This is cool
    reass z = 10
}

end


----------------------------------
Example Code Converted to Java:
----------------------------------
public static void main(String[] args){

int x = 5;
String y = "hello";
Scanner scan = new Scanner(System.in);
//WARNING: Don't forget to import the scanner class!
String hello = scan.nextLine();


for(int z = 0; z<10; z++){
   System.out.print(x);
   System.out.print("wow! This is cool");
    //WARNING: For loop control variable re-assignment is not good!
    z = 10;
}

}
//Made with Ez-Compile
