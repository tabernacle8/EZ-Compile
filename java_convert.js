const fs = require('fs') 
  
fs.readFile('your_code.txt', (err, data) => { 
    if (err) throw err; 

    //Split and prepare
    lines = data.toString().split("\n")
    var count = 0
    var variables = []
    var storage = []
    var line = ""
    var totaltext = ""
    var infor = false
    var re_ass_for = ""
    var scanner = "nothing"
    var needquotes = false

    //Main Eval
    function find(what,variables){
        var count = 0
        while(count<variables.length){
            if(what==variables[count]){
                return(count)
            }
            count+=1
        }
        return(-1)
    }
   for(var count=0;count<lines.length;count++){
    // GET LINE: console.log(lines[count])
    line = lines[count]

    line = line.replace("    ","")

    if(line.startsWith("getter ")){
        var pre_var_name = line.replace("getter ","")
        var varname = pre_var_name.split(":")[0]
        var getcall = pre_var_name.split(":")[1]

        totaltext+=("public String "+ getcall+"\n")
        totaltext+=(`{\nreturn ${varname};\n}\n`)

    }
    else if(line.startsWith("main")){
        totaltext+=(`public static void main(String[] args){\n`)
    }
    else if(line=="end"){
        totaltext+=(`}\n`)
    }
    else if(line.startsWith("scanner")){
        line = line.replace(/(\r\n|\n|\r)/gm,"");
        var object = line.replace("scanner= ","")
        object = object.replace("scanner = ","")
        scanner = object
        if(infor==true){
            console.log(`ERROR: Can't create scanner in loop! (Line ${count+1})`)
        }
        totaltext+=(`Scanner ${object} = new Scanner(System.in);\n`)
        totaltext+=(`//WARNING: Don't forget to import the scanner class!\n`)
    }

    else if(line.includes("sopln ")){
        line = line.replace(/(\r\n|\n|\r)/gm,"");
        var thing_to_print = line.replace("sopln ").replace("undefined","")
        thing_to_print = thing_to_print.replace("   ","")
        if(infor==true){
            if(variables.includes(thing_to_print)){
                totaltext+=(`   System.out.println(${thing_to_print});\n`)
            }
            else{
                totaltext+=(`   System.out.println("${thing_to_print}");\n`)
            }
        }
        else{
        if(variables.includes(thing_to_print)||thing_to_print.includes("+")){
            totaltext+=(`System.out.println(${thing_to_print});\n`)
        }
        else{
            totaltext+=(`System.out.println("${thing_to_print}");\n`)
        }
    }
    }


    else if(line.includes("sop ")){
        line = line.replace(/(\r\n|\n|\r)/gm,"");
        var thing_to_print = line.replace("sop ").replace("undefined","")
        thing_to_print = thing_to_print.replace("   ","")
            if(infor==true){
                if(variables.includes(thing_to_print)){
                    totaltext+=(`   System.out.print(${thing_to_print});\n`)
                }
                else{
                    totaltext+=(`   System.out.print("${thing_to_print}");\n`)
                }
            }
            else{
            if(variables.includes(thing_to_print)||thing_to_print.includes("+")){
                totaltext+=(`System.out.print(${thing_to_print});\n`)
            }
            else{
                totaltext+=(`System.out.print("${thing_to_print}");\n`)
            }
        }
    }
    
    else if(line.startsWith("for(")){
        line = line.replace(/(\r\n|\n|\r)/gm,"");
        line = line.replace("for(","").replace("){","")
        var variable = ""
        var result = ""
        operand = line.split(",")[0]
        modifier = line.split(",")[1]

        //Does var exist already?
        

        //if not:
        if(operand.includes("<=")){
            variable = operand.split("<=")[0]
            result = operand.split("<=")[1]
            if(variables.includes(variable)){
                console.log(`ERROR: Variable already assigned (Bad for loop dec)! (Line: ${count+1})`)
                return;
            }
            totaltext+=(`for(int ${variable} = 0; ${variable}<=${result}; ${variable}${modifier}){\n`)

        }
        else if(operand.includes(">=")){
            variable = operand.split(">=")[0]
            result = operand.split(">=")[1]
            if(variables.includes(variable)){
                console.log(`ERROR: Variable already assigned (Bad for loop dec)! (Line: ${count+1})`)
                return;
            }
            totaltext+=(`for(int ${variable} = 0; ${variable}>=${result}; ${variable}${modifier}){\n`)
        }
        else if(operand.includes(">")){
            variable = operand.split(">")[0]
            result = operand.split(">")[1]
            if(variables.includes(variable)){
                console.log(`ERROR: Variable already assigned (Bad for loop dec)! (Line: ${count+1})`)
                return;
            }
            totaltext+=(`for(int ${variable} = 0; ${variable}>${result}; ${variable}${modifier}){\n`)
        }
        else if(operand.includes("<")){
            variable = operand.split("<")[0]
            result = operand.split("<")[1]
            if(variables.includes(variable)){
                console.log(`ERROR: Variable already assigned (Bad for loop dec)! (Line: ${count+1})`)
                return;
            }
            totaltext+=(`for(int ${variable} = 0; ${variable}<${result}; ${variable}${modifier}){\n`)
        }
        re_ass_for = variable
        //Log in for loop
        infor = true
    }
    else if(line.startsWith("run(")){
        line = line.replace("run(","").replace("){","")
        line = line.replace(/(\r\n|\n|\r)/gm,"");
        variable = line.split(",")[0]
        times = line.split(",")[1]
        if(variables.includes("variable")){
            console.log(`ERROR: Cannot make run loop. Variable already assigned (Line: ${count+1})`)
            return;
        }
        totaltext+=(`for(int ${variable} = 0; ${variable}<${times}; ${variable}++){\n`)
        variables.push(variable)
        re_ass_for = variable
        storage.push("no")
    }
    else if(line.startsWith("reass")){
        line = line.replace("reass ","")
        line = line.replace(/(\r\n|\n|\r)/gm,"");
        variable = line.split("=")[0].replace(/ /g,"")
        equals = line.split("=")[1].replace(/ /g,"").replace(/"/g,"")
        //Re-Assign
        //Consist data type
        if(find(variable,variables)>=0){

            variable_test_numb = Number(equals)
            if(variable_test_numb>=0 ||variable_test_numb<=0){
                if(storage[find(variable,variables)]!="int"){
                    console.log(`ERROR: Re-assigned an int to another type (Line: ${count+ 1})`)
                    return;
                }
            }
            else if(equals=="true" || equals=="false"){
                if(storage[find(variable,variables)]!="boolean"){
                    console.log(`ERROR: Re-assigned a string to another type (Line: ${count+1})`)
                    return;
                }
            }
            else{
                if(storage[find(variable,variables)]!="string"){
                    console.log(`ERROR: Re-assigned a string to another type (Line: ${count+1})`)
                    needquotes = true
                    return;
                }
            }

        }
        //Test for loop re-assignment
        if(infor==true&&re_ass_for==variable){
            totaltext+=(`    //WARNING: For loop control variable re-assignment is not good!\n`)
            if(needquotes==true){
                totaltext+=(`    ${variable} = \"${equals}\";\n`)
            }
            else{
                totaltext+=(`    ${variable} = ${equals};\n`)
            }
        }
        else{
            if(needquotes==true){
                totaltext+=(`${variable} = \"${equals}\";\n`)
            }
            else{
                totaltext+=(`${variable} = ${equals};\n`)
            }
        }
        }
    



    else if(line.startsWith("ass")){
        line = line.replace("ass ","")
        line = line.replace(/(\r\n|\n|\r)/gm,"");
        variable = line.split("=")[0].replace(/ /g,"")
        equals = line.split("=")[1].replace(/ /g,"").replace(/"/g,"")


        //Test Vars
        variable_test_numb = Number(equals)
        //Run Determination
        
        if(variables.includes(variable)|| scanner == variable){
            console.log(`ERROR: Variable already assigned! (Line: ${count+1})`)
            return;
        }
        variables.push(variable)
        if(equals=="input"){
            if(scanner=="nothing"){
                if(variables.includes("user_input")){
                    console.log(`ERROR: Tried to create a new scanner class but "user_input" was defined by the user (Line: ${count+1})`)
                    return;
                }
                else{
                    scanner = "user_input"
                    if(infor==true){
                        console.log(`ERROR: Can't create scanner in loop! (Line ${count+1})`)
                    }
                    totaltext+=(`Scanner user_input = new Scanner(System.in);\n`)
                    totaltext+=(`//WARNING: Don't forget to import the scanner class!\n`)
                }
            }
            totaltext+=(`String ${variable} = ${scanner}.nextLine();\n`)
        }
         else if(variable_test_numb>=0 ||variable_test_numb<=0){
            totaltext+=(`int ${variable} = ${equals};\n`)
            storage.push("int")
        }
        else if(equals.startsWith("true")){
            totaltext+=(`boolean ${variable} = true;\n`)
            storage.push("boolean")
        }
        else if(equals.startsWith("false")){
            totaltext+=(`boolean ${variable} = false;\n`)
            storage.push("boolean")
        }
        else{
            totaltext+=(`String ${variable} = \"${equals}\";\n`)
            storage.push("string")
        }
    }
    else{
        if(line.includes("}")){
            infor = false
        }
        totaltext+=(`${line}\n`)
    }

    }
    totaltext+=(`//Made with Ez-Compile`)
    console.log(`//Your code will output below:\n${totaltext}`)
}) 
