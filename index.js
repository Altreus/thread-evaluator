
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

var Evaluate = function(instructions, data){
   this.data = data;
   this.instructions = instructions;
   this.checks = {failed : [], succeeded : []};

   this.state = operators[this.instructions.func](this.evaluate(this.instructions.left), this.evaluate(this.instructions.right));
   this.checks[this.state ? 'succeeded' : 'failed'].push(this.getLog(this.instructions, this.state));

   return {
      state : this.state,
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
         return this.getValue(instruction.model); 
      } else if(instruction.operation) {
         return operators[instruction.operation.func](this.evaluate(instruction.operation.left),this.evaluate(instruction.operation.right));
      } else {
         return instruction.value;
      }
   }
}

Evaluate.prototype.getValue = function(model){
   var data = this.data;
   model = model.split('.');
   while(model.length){
      var seg = model.shift();
      data = data[seg];
   }
   return data;
}

Evaluate.prototype.getLogData = function(side, res){

   if(side.model){
      return side.model + ': (' + this.getValue(side.model) + ')';
   } else if (side.operation){
      return 'Sum : (' + this.evaluate(side.operation.left) + ' ' + side.operation.func + ' ' + this.evaluate(side.operation.right) + ')';
    } else {
      return 'Value: (' + side.value + ')';
   }

   var sideData = side.model ? this.getValue(side.model) : side.value;
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
