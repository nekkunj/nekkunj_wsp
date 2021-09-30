$(document).ready(function () {
    $('#final').hide(); 
    $('#equationcheck').hide();   
    $('#maximumvariablescheck').hide();   
    var count=0;
    
   $('#equation').keyup(function () {


$("#res").empty()
var str = $("#equation").val()
 
$('#equationcheck').hide(); 
$('#final').show(); 
$('#maximumvariablescheck').hide();   
var open_brackets_count=0;
 count=0;
var flag=0;
var variable_list=[]
for ( var i = 0; i < str.length; i++ )
{
if(str.charAt(i).match(/[a-z]/i)) 
   {
       if(flag==0){
       flag=1
       

       var variable=""
       while( (i < str.length) && (str.charAt(i).match(/[a-z]/i))  ){
        variable=variable + str.charAt(i)
        ++i;
    }
--i;


       if($.inArray(variable, variable_list )==-1){
        ++count
$("#res").append(` <div class="m-2" style=" "><p class="text-center" for="${count}">${variable}</p><br><input type="number" style="margin:1%" class="rounded " value="0" required name="${variable}" id="${count}" placeholder="${variable} ="> </div>`)
variable_list.push(variable)
       }

      
    
}
else{
    $('#equationcheck').show(); 
    $('#final').hide(); 
    $("#res").empty()
    break;
}
}

else if($.isNumeric(str.charAt(i)))
{
    if(flag==0){
    flag=1
    }
    else{
        $('#equationcheck').show(); 
        $('#final').hide(); 
        $("#res").empty()
        break;
    }

    while( (i < str.length) && ($.isNumeric(str.charAt(i)))  ){
        ++i;
    }
--i;


}

else if(str.charAt(i)==' ')
continue;
else if( $.inArray(str.charAt(i), [ "+", "-", "/", "*"] ) >=0 && i!=str.length -1 ){
if(flag==1){
flag=0;
}
else{
    $('#equationcheck').show(); 
    $('#final').hide(); 
    $("#res").empty()
    break;
}
}

else if(str.charAt(i)=='('){
    ++open_brackets_count
}
else if(str.charAt(i)==')'){
    if(open_brackets_count==0)
    {
        $('#equationcheck').show(); 
        $('#final').hide(); 
        $("#res").empty()
        break;
    }
    --open_brackets_count

}


else{
    $('#equationcheck').show(); 
    $('#final').hide(); 
    $("#res").empty()
    break;
}
}

if(open_brackets_count!=0)
{
    $('#equationcheck').show(); 
    $('#final').hide(); 
    $("#res").empty()
    
}
console.log(count)
if(count>26){
    
    $('#maximumvariablescheck').show(); 
    $('#final').hide(); 
        $("#res").empty()
}

})

function precedence(c) {
    
    if(c == '/' || c=='*')
        return 2;
    else if(c == '+' || c == '-')
        return 1;
    else
        return -1;
}

function Calculteoperation(a, b, op){
    switch(op){
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
    }
}

function calculateequation(str){
    var values = [];
    
    var operator = [];
    

    for ( var i = 0; i < str.length; i++ )
{
    if(str.charAt(i)==' ')
    continue;

    else if(str.charAt(i)=='(')
    {
        
        operator.push(str.charAt(i))
    }

    else if ($.isNumeric(str.charAt(i))){
        var val = 0;
        while( (i < str.length) && ($.isNumeric(str.charAt(i)))  )
{
val = (val*10) + (str.charAt(i)-'0');
++i;
}

values.push(val);
--i

    }


    else if(str.charAt(i)==')'){

        while( operator.length>0 && operator[operator.length -1]!= '(')
            {
                var val2 = values[values.length -1];
                values.pop();
                 
                var val1 = values[values.length -1];
                values.pop();
                 
                var op = operator[operator.length -1];
                operator.pop();
                 
                values.push(Calculteoperation(val1, val2, op));
            }
             
            
            if(operator.length>0)
               operator.pop();
    }


    else{
        while(operator.length>0 && precedence(operator[operator.length -1])>= precedence(str.charAt(i))){
var val2 = values[values.length -1];
values.pop();

var val1 = values[values.length -1];
values.pop();

var op = operator[operator.length -1];
operator.pop();

values.push(Calculteoperation(val1, val2, op));
}


operator.push(str.charAt(i));
    }

}


while(operator.length>0){
    var val2 = values[values.length -1];
    values.pop();
             
    var val1 = values[values.length -1];
    values.pop();
             
    var op = operator[operator.length -1];
    operator.pop();
             
    values.push(Calculteoperation(val1, val2, op));
}

return values[0]
}



$('#final').click(function (){
    var str = $("#equation").val()
var b=$("#equation").val()
   for(var j=1;j<=count;j++){
       var temp=$("#" + j).val()
       
       var name=$("#" + j).attr("name")
       
       
       str=str.replaceAll(name,temp)
       
   }
   console.log(str) 
   var a=calculateequation(str)
   $("#output").empty()
    $("#output").html(`<b>Result:  ${a}</b>`)
   


})

})