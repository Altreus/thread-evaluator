
var lang = {
   'eq' : 'Equals',
   'gt' : 'Greater than',
   'lt' : 'Less than',
   'gte' : 'Greater than or equal to',
   'lte' : 'Less than or equal to',
   'and' : 'And',
   'or' : 'Or',
   'in' : 'In',
   'modulo' : 'Modulo'
};

var operators = {
   eq : function(l, r){
      return l == r;
   },
   'gt' : function(l, r){
      return l > r;
   },
   'lt' : function(l, r){
      return l < r;
   },
   'gte' : function(l, r){
      return l >= r;
   },
   'lte' : function(l, r){
      return l <= r;
   },
   'and' : function(l, r){
      return l && r;
   },
   'or' : function(l, r){
      return l || r;
   },
   'in' : function(l, r){
      return r.indexOf(l) !== -1;
   },
   'modulo' : function(l, r){
      return l % r;
   },
   'add' : function(l, r){
      return l + r;
   },
   'subtract' : function(l, r){
      return l - r;
   },
   'multiply' : function(l, r){
      return l * r;
   },
   'divide' : function(l , r){
      return l / r;
   }
};

function getValue (model, data){
   model = model.split('.');
   while(model.length){
      var seg = model.shift();
      data = data[seg];
   }
   return data;
}

var Evaluate = function(instructions, data){
   this.data = data;
   this.checks = {failed : [], succeeded : []};

   var state = operators[instructions.func](this.evaluate(instructions.left), this.evaluate(instructions.right));
   this.checks[state ? 'succeeded' : 'failed'].push(this.getLog(instructions, state));

   return {
      state : state,
      checks : this.checks
   };
}

Evaluate.prototype.evaluate = function(instruction){
   if (instruction.func) { 
      var res = operators[instruction.func](this.evaluate(instruction.left), this.evaluate(instruction.right));
      this.checks[res ? 'succeeded' : 'failed'].push(this.getLog(instruction, res));
      return res;
   } else { 
      if(instruction.model){
         return getValue(instruction.model, this.data); 
      } else if(instruction.operation) {
         return operators[instruction.operation.func](this.evaluate(instruction.operation.left),this.evaluate(instruction.operation.right));
      } else {
         return instruction.value;
      }
   }
}

Evaluate.prototype.getLogData = function(side, res){

   if(side.model){
      return side.model + ': (' + getValue(side.model, this.data) + ')';
   } else if (side.operation){
      return 'Sum : (' + this.evaluate(side.operation.left) + ' ' + side.operation.func + ' ' + this.evaluate(side.operation.right) + ')';
    } else {
      return 'Value: (' + side.value + ')';
   }

   var sideData = side.model ? getValue(side.model, this.data) : side.value;
   sideData = !sideData ? res : sideData;

}

Evaluate.prototype.getLog = function(instruction, res){
   var message = {left : "", right : ""};
   for(var x in message){
      sideData = this.getLogData(instruction[x], res);
      message[x] = sideData;
   }
   return message.left + ' ' + lang[instruction.func] + ' ' + message.right;
}

module.exports = Evaluate;
